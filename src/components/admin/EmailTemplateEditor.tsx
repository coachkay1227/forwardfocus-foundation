import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Edit, Save, Eye, Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmailTemplate {
  id: string;
  template_name: string;
  subject: string;
  content_blocks: any;
  variables: string[];
  is_active: boolean;
  version: number;
  updated_at: string;
}

export const EmailTemplateEditor = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editing, setEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('template_name');

      if (error) throw error;
      setTemplates((data || []).map(t => ({
        ...t,
        variables: Array.isArray(t.variables) ? t.variables : []
      })) as EmailTemplate[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load email templates",
        variant: "destructive",
      });
    }
  };

  const saveTemplate = async () => {
    if (!selectedTemplate) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          subject: selectedTemplate.subject,
          content_blocks: selectedTemplate.content_blocks,
          version: selectedTemplate.version + 1,
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template updated successfully",
      });

      loadTemplates();
      setEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save template",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getTemplateLabel = (name: string) => {
    const labels: Record<string, string> = {
      'monday_newsletter': 'Monday Update',
      'monday_update': 'Monday Update',
      'wednesday_collective': 'Wednesday Collective',
      'friday_recap': 'Friday Recap',
      'sunday_community_call': 'Sunday Community Call'
    };
    return labels[name] || name;
  };

  const insertVariable = (variable: string) => {
    if (!selectedTemplate) return;
    
    // For simplicity, append to hero_text in content_blocks
    const updatedBlocks = {
      ...selectedTemplate.content_blocks,
      hero_text: (selectedTemplate.content_blocks.hero_text || '') + ` {{${variable}}}`
    };
    
    setSelectedTemplate({
      ...selectedTemplate,
      content_blocks: updatedBlocks
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Email Template Editor
        </CardTitle>
        <CardDescription>
          Manage and customize email templates with dynamic variables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Template Selector */}
          <div className="space-y-2">
            <Label>Select Template</Label>
            <Select
              value={selectedTemplate?.id || ''}
              onValueChange={(id) => {
                const template = templates.find(t => t.id === id);
                setSelectedTemplate(template || null);
                setEditing(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a template to edit" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      {getTemplateLabel(template.template_name)}
                      {template.is_active && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Template Details */}
          {selectedTemplate && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{getTemplateLabel(selectedTemplate.template_name)}</h3>
                  <p className="text-sm text-muted-foreground">Version {selectedTemplate.version}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  {!editing ? (
                    <Button
                      size="sm"
                      onClick={() => setEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={saveTemplate}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  )}
                </div>
              </div>

              {editing && (
                <>
                  {/* Subject Line Editor */}
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value
                      })}
                      placeholder="Enter email subject"
                    />
                  </div>

                  {/* Content Blocks Editor */}
                  <div className="space-y-2">
                    <Label>Hero Text</Label>
                    <Textarea
                      value={selectedTemplate.content_blocks.hero_text || ''}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        content_blocks: {
                          ...selectedTemplate.content_blocks,
                          hero_text: e.target.value
                        }
                      })}
                      rows={3}
                      placeholder="Main hero text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Primary CTA Text</Label>
                    <Input
                      value={selectedTemplate.content_blocks.cta_text || ''}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        content_blocks: {
                          ...selectedTemplate.content_blocks,
                          cta_text: e.target.value
                        }
                      })}
                      placeholder="Call to action button text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Primary CTA Link</Label>
                    <Input
                      value={selectedTemplate.content_blocks.cta_link || ''}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        content_blocks: {
                          ...selectedTemplate.content_blocks,
                          cta_link: e.target.value
                        }
                      })}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Dynamic Variables */}
                  <div className="space-y-2">
                    <Label>Insert Dynamic Variable</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((variable) => (
                        <Button
                          key={variable}
                          variant="outline"
                          size="sm"
                          onClick={() => insertVariable(variable)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {`{{${variable}}}`}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click to insert variable into hero text
                    </p>
                  </div>
                </>
              )}

              {!editing && (
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <strong className="text-sm">Subject:</strong>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.subject}</p>
                  </div>
                  <div>
                    <strong className="text-sm">Hero Text:</strong>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate.content_blocks.hero_text || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <strong className="text-sm">Available Variables:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="secondary" className="text-xs">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {templates.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No email templates found. They will be created automatically.
            </p>
          )}
        </div>

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Email Preview</DialogTitle>
              <DialogDescription>
                Preview how this email will look to recipients
              </DialogDescription>
            </DialogHeader>
            {selectedTemplate && (
              <div className="space-y-4">
                <div>
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </div>
                <div className="border rounded-lg p-4 bg-background">
                  <div className="text-center mb-4 p-4 bg-primary text-primary-foreground rounded-t-lg">
                    <h2 className="font-bold text-xl">Forward Focus Elevation</h2>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {selectedTemplate.content_blocks.hero_text}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      [Email content would appear here with full formatting]
                    </p>
                    {selectedTemplate.content_blocks.cta_text && (
                      <Button className="w-full">
                        {selectedTemplate.content_blocks.cta_text}
                      </Button>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t text-xs text-muted-foreground text-center">
                    Forward Focus Elevation | Manage Preferences | Unsubscribe
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
