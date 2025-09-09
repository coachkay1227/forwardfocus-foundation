import React, { useState, useEffect, useRef } from "react";
import { X, Phone, MessageCircle, MapPin, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMERGENCY = "911";
const MENTAL = "988";

export const EmergencySafetySystem = () => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const [ringProgress, setRingProgress] = useState(0);
  
  const longPressRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const tapCountRef = useRef<number[]>([]);
  const pressingRef = useRef(false);

  // Handle topbar dismiss
  useEffect(() => {
    const hidden = localStorage.getItem("crisisBarHidden");
    if (hidden) {
      setIsTopBarVisible(false);
    }
  }, []);

  const dismissTopBar = () => {
    localStorage.setItem("crisisBarHidden", "1");
    setIsTopBarVisible(false);
  };

  // Long press functionality
  const startLongPress = () => {
    pressingRef.current = true;
    startTimeRef.current = Date.now();
    
    const updateProgress = () => {
      if (!pressingRef.current) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / 2000); // 2 second hold
      setRingProgress(progress);
      
      if (progress >= 1) {
        // Auto-dial emergency
        window.location.href = `tel:${EMERGENCY}`;
        stopLongPress();
        return;
      }
      
      requestAnimationFrame(updateProgress);
    };
    
    requestAnimationFrame(updateProgress);
  };

  const stopLongPress = () => {
    pressingRef.current = false;
    setRingProgress(0);
    if (longPressRef.current) {
      cancelAnimationFrame(longPressRef.current);
    }
  };

  // Triple-tap to toggle label
  const handleTripleTap = () => {
    const now = Date.now();
    tapCountRef.current = tapCountRef.current.filter(tap => now - tap < 450);
    tapCountRef.current.push(now);
    
    if (tapCountRef.current.length >= 3) {
      setIsLabelVisible(!isLabelVisible);
      tapCountRef.current = [];
    }
  };

  const handleEmergencyAction = (action: string) => {
    switch (action) {
      case "call":
        window.location.href = `tel:${EMERGENCY}`;
        break;
      case "mh":
        window.location.href = `tel:${MENTAL}`;
        break;
      case "sms":
        window.location.href = `sms:?&body=${encodeURIComponent("I need help. My location: " + window.location.href)}`;
        break;
      case "loc":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const url = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
              if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(url);
              }
              alert("Location copied: " + url);
            },
            () => alert("Could not get location")
          );
        } else {
          alert("Location not available");
        }
        break;
      case "chat":
        // Try to find existing chat button or redirect to contact
        const chatButton = document.querySelector("[data-chat-launch]") || document.querySelector("#lovable-chat-launch");
        if (chatButton && 'click' in chatButton) {
          (chatButton as HTMLElement).click();
        } else {
          window.location.assign("/contact");
        }
        break;
      case "exit":
        window.location.assign("https://www.google.com");
        break;
    }
    setIsSheetOpen(false);
  };

  return (
    <>
      {/* Crisis Top Bar */}
      {isTopBarVisible && (
        <div className="fixed top-0 left-0 w-full z-[10000] bg-destructive text-destructive-foreground shadow-sm">
          <div className="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-center gap-2 relative">
            <span className="text-sm font-medium text-center">
              ⚠️ <strong>Crisis?</strong> Call{" "}
              <a href={`tel:${EMERGENCY}`} className="underline hover:no-underline">
                {EMERGENCY}
              </a>{" "}
              • Mental health:{" "}
              <a href={`tel:${MENTAL}`} className="underline hover:no-underline">
                {MENTAL}
              </a>{" "}
              • Text <strong>HOME</strong> to <strong>741741</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissTopBar}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-destructive-foreground/20"
              aria-label="Dismiss crisis bar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Safety Dock */}
      <div className="fixed right-4 bottom-4 z-[10001]">
        <Button
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full px-4 py-2 shadow-2xl flex items-center gap-2 h-auto"
          onMouseDown={startLongPress}
          onMouseUp={stopLongPress}
          onMouseLeave={stopLongPress}
          onTouchStart={startLongPress}
          onTouchEnd={stopLongPress}
          onTouchCancel={stopLongPress}
          onClick={(e) => {
            e.stopPropagation();
            handleTripleTap();
            setIsSheetOpen(!isSheetOpen);
          }}
          aria-label="Emergency menu"
        >
          <div className="relative w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
            <Phone className="h-5 w-5" />
            {/* Progress ring */}
            <svg 
              className="absolute inset-0 w-11 h-11 -rotate-90"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (ringProgress * 125.6)}
                className="transition-all duration-75 linear"
              />
            </svg>
          </div>
          {isLabelVisible && (
            <span className="font-semibold text-sm">Emergency</span>
          )}
        </Button>
      </div>

      {/* Backdrop and Sheet */}
      {isSheetOpen && (
        <div 
          className="fixed inset-0 bg-black/45 z-[10000] transition-opacity duration-200"
          onClick={() => setIsSheetOpen(false)}
        >
          <div 
            className="absolute right-4 bottom-20 w-80 max-w-[calc(100vw-2rem)] bg-background rounded-2xl p-3 grid grid-cols-2 gap-2 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => handleEmergencyAction("call")}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              📞 Call {EMERGENCY}
            </Button>
            
            <Button
              onClick={() => handleEmergencyAction("mh")}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              🧠 Mental Health {MENTAL}
            </Button>
            
            <Button
              onClick={() => handleEmergencyAction("sms")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              💬 SMS Help
            </Button>
            
            <Button
              onClick={() => handleEmergencyAction("loc")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              📍 Share Location
            </Button>
            
            <Button
              onClick={() => handleEmergencyAction("chat")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              🛟 Emergency Chat
            </Button>
            
            <Button
              onClick={() => handleEmergencyAction("exit")}
              className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2 h-auto py-3 text-sm font-semibold"
            >
              🚪 Quick Exit
            </Button>
            
            <p className="col-span-2 text-center text-xs text-muted-foreground mt-1">
              Long-press to auto-dial • Triple-tap to toggle label
            </p>
          </div>
        </div>
      )}

      {/* Body padding for crisis bar */}
      {isTopBarVisible && (
        <style>
          {`
            body { padding-top: 52px !important; }
            @media (max-width: 480px) {
              body { padding-top: 64px !important; }
            }
          `}
        </style>
      )}
    </>
  );
};