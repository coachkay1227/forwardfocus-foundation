import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SearchFilters from "@/components/resources/SearchFilters";
import ResourceCard from "@/components/resources/ResourceCard";
import AIResourceDiscovery from "@/components/ai/AIResourceDiscovery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Filter, MapPin, Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Import hero image
import communitySearchResources from "@/assets/community-search-resources.jpg";

type QuickFilter = "all" | "emergency" | "ongoing" | "new" | "partner";

interface Resource {
  id: string;
  name: string;
  organization: string;
  description: string;
  type: string;
  county: string;
  city: string;
  state_code: string;
  phone: string;
  website: string;
  address: string;
  justice_friendly: boolean;
  verified: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [county, setCounty] = useState(searchParams.get("county") || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAIDiscovery, setShowAIDiscovery] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Discover Resources | Forward Focus Elevation";
    if (activeTab === "search") {
      fetchResources();
    }
  }, [searchTerm, county, selectedTypes, quickFilter, activeTab]);

  useEffect(() => {
    const q = searchParams.get("q");
    const c = searchParams.get("county");
    if (q) setSearchTerm(q);
    if (c) setCounty(c);
  }, [searchParams]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      let query = supabase.from("resources").select("*");

      // Apply search term filter
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,organization.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply county filter
      if (county) {
        query = query.eq("county", county);
      }

      // Apply type filters
      if (selectedTypes.length > 0) {
        query = query.in("type", selectedTypes);
      }

      // Apply quick filters
      switch (quickFilter) {
        case "emergency":
          query = query.in("type", ["Emergency Services", "Crisis Intervention", "Legal Aid"]);
          break;
        case "ongoing":
          query = query.in("type", ["Employment", "Housing", "Mental Health", "Substance Abuse"]);
          break;
        case "new":
          query = query.gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
          break;
        case "partner":
          query = query.eq("verified", "partner");
          break;
      }

      query = query.order("rating", { ascending: false }).order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({
        title: "Error",
        description: "Failed to load resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (county) params.set("county", county);
    setSearchParams(params);
  };

  const getResultsText = () => {
    const count = resources.length;
    if (loading) return "Searching...";
    if (count === 0) return "No resources found";
    return `${count} resource${count !== 1 ? "s" : ""} found`;
  };

  return (
    <main id="main" className="min-h-screen bg-gradient-osu-subtle">
      {/* Hero Section */}
      <div className="bg-gradient-osu-primary border-b border-osu-scarlet/20 mb-12">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">Discover Resources</h1>
            <p className="text-xl text-white leading-relaxed">
              Find support services with AI assistance or browse our comprehensive directory of resources 
              for justice-impacted individuals and families.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Resource Discovery Options */}
          <div className="relative mb-12 bg-card rounded-2xl shadow-xl border border-osu-gray/20 overflow-hidden">
            <img 
              src={communitySearchResources} 
              alt="Diverse individuals using search and digital resources in a community center"
              className="w-full h-64 object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-osu-scarlet/10 to-osu-gray/10 flex items-center justify-center">
              <div className="text-center text-osu-scarlet max-w-4xl px-8">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Unified Resource Discovery</h2>
                <p className="text-osu-gray">
                  Choose your preferred way to find resources - AI-powered assistance or traditional search
                </p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex w-full bg-osu-gray/10 border border-osu-gray/20">
              <TabsTrigger 
                value="ai" 
                className="flex-1 data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Discovery
              </TabsTrigger>
              <TabsTrigger 
                value="search" 
                className="flex-1 data-[state=active]:bg-osu-scarlet data-[state=active]:text-white text-osu-gray"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Advanced Search
              </TabsTrigger>
            </TabsList>

            {/* AI Discovery Tab */}
            <TabsContent value="ai" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-osu-scarlet/20 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-osu-scarlet/5 to-osu-gray/5">
                    <CardTitle className="flex items-center gap-2 text-osu-scarlet">
                      <Sparkles className="h-5 w-5" />
                      AI-Powered Resource Discovery
                    </CardTitle>
                    <CardDescription className="text-osu-gray">
                      Get personalized recommendations based on your specific needs and location
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <p className="text-sm text-osu-gray">
                        Our AI assistant can understand your needs in natural language and recommend the most relevant resources, 
                        complete with explanations of why each resource might help.
                      </p>
                      <Button 
                        onClick={() => setShowAIDiscovery(true)}
                        className="w-full bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white"
                      >
                        <Bot className="h-4 w-4 mr-2" />
                        Start AI Discovery
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-osu-gray/20 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-osu-gray/5 to-osu-scarlet/5">
                    <CardTitle className="flex items-center gap-2 text-osu-gray">
                      <SearchIcon className="h-5 w-5" />
                      Quick Search Examples
                    </CardTitle>
                    <CardDescription className="text-osu-gray">
                      Try asking the AI about these common needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {[
                        "Find housing assistance in my area",
                        "I need help with food and basic needs", 
                        "Looking for job training programs",
                        "Need legal aid for family issues",
                        "Mental health support services",
                        "Help for someone coming home from prison"
                      ].map((query, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3 text-xs hover:bg-osu-scarlet/10 hover:border-osu-scarlet/30"
                          onClick={() => {
                            setShowAIDiscovery(true);
                            // Pass the query as initial query to AI Discovery
                          }}
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Traditional Search Tab */}
            <TabsContent value="search" className="space-y-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-osu-gray h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search resources, organizations, or services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowFilters(!showFilters)}
                      className={`border-osu-gray/30 hover:bg-osu-scarlet/5 ${showFilters ? "bg-osu-scarlet/10 border-osu-scarlet" : ""}`}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="submit" 
                      className="px-8 bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white shadow-lg"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>

              {/* Filters */}
              {showFilters && (
                <div className="mb-6 p-4 border border-osu-gray/20 rounded-lg bg-osu-gray/5">
                  <SearchFilters
                    county={county}
                    selectedTypes={selectedTypes}
                    quickFilter={quickFilter}
                    onCountyChange={setCounty}
                    onTypesChange={setSelectedTypes}
                    onQuickFilterChange={setQuickFilter}
                  />
                </div>
              )}

              {/* Active Filters */}
              {(searchTerm || county || selectedTypes.length > 0 || quickFilter !== "all") && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-osu-scarlet">Active filters:</span>
                    {searchTerm && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-osu-scarlet/10 text-osu-scarlet border-osu-scarlet/20">
                        <SearchIcon className="h-3 w-3" />
                        "{searchTerm}"
                      </Badge>
                    )}
                    {county && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-osu-gray/10 text-osu-gray border-osu-gray/20">
                        <MapPin className="h-3 w-3" />
                        {county}
                      </Badge>
                    )}
                    {selectedTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="bg-osu-scarlet/10 text-osu-scarlet border-osu-scarlet/20">
                        {type}
                      </Badge>
                    ))}
                    {quickFilter !== "all" && (
                      <Badge variant="secondary" className="bg-osu-gray/10 text-osu-gray border-osu-gray/20">
                        {quickFilter === "emergency" && "Emergency Services"}
                        {quickFilter === "ongoing" && "Ongoing Support"}
                        {quickFilter === "new" && "New Resources"}
                        {quickFilter === "partner" && "Partner Recommended"}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Separator className="mb-6 bg-osu-gray/20" />

              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-osu-scarlet">{getResultsText()}</h2>
              </div>

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {resources.map((resource) => (
                     <ResourceCard 
                       key={resource.id} 
                       resource={resource}
                     />
                   ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="mx-auto h-12 w-12 text-osu-gray mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-osu-scarlet">No resources found</h3>
                  <p className="text-osu-gray mb-4">
                    Try adjusting your search terms or filters to find more results.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="border-osu-gray/30 text-osu-gray hover:bg-osu-scarlet hover:text-white"
                      onClick={() => {
                        setSearchTerm("");
                        setCounty("");
                        setSelectedTypes([]);
                        setQuickFilter("all");
                        setSearchParams({});
                      }}
                    >
                      Clear all filters
                    </Button>
                    <p className="text-sm text-osu-gray">or try</p>
                    <Button 
                      onClick={() => setActiveTab("ai")}
                      className="bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Use AI Discovery
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Resource Discovery Modal */}
      <AIResourceDiscovery
        isOpen={showAIDiscovery}
        onClose={() => setShowAIDiscovery(false)}
        location={county}
      />
    </main>
  );
};

export default Discover;