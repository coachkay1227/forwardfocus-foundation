import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

export const NewsletterModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the modal
    const hasSeenModal = localStorage.getItem('newsletter-modal-dismissed');
    
    if (!hasSeenModal) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (permanent: boolean) => {
    setShowModal(false);
    if (permanent) {
      localStorage.setItem('newsletter-modal-dismissed', 'true');
      setDismissed(true);
    }
  };

  return (
    <Dialog open={showModal && !dismissed} onOpenChange={(open) => !open && handleDismiss(false)}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-osu-scarlet via-osu-scarlet-dark to-osu-scarlet border-2 border-osu-gray-light/20 shadow-2xl">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => handleDismiss(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-white text-center pt-4">
            📧 Stay Connected with Our Community
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-white/95 pt-2">
          <p className="text-lg text-center font-medium">
            Join our newsletter to receive:
          </p>
          
          <ul className="space-y-4 px-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-osu-gray-light flex-shrink-0 mt-0.5" />
              <span className="text-base">Curated resources and support networks tailored to your needs</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-osu-gray-light flex-shrink-0 mt-0.5" />
              <span className="text-base">Inspiring success stories from justice-impacted families</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-osu-gray-light flex-shrink-0 mt-0.5" />
              <span className="text-base">Updates on new resources and community events</span>
            </li>
          </ul>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <NewsletterSignup />
          </div>
          
          <p className="text-xs text-white/70 text-center px-4 leading-relaxed">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="ghost"
              onClick={() => handleDismiss(false)}
              className="text-white border border-white/30 hover:bg-white/10"
            >
              Remind me later
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleDismiss(true)}
              className="text-white/80 hover:text-white/60 text-sm"
            >
              Don't show again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
