import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    if (!bookingName.trim() || !bookingEmail.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
      
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id || crypto.randomUUID();

      const { error: dbError } = await supabase.from('bookings').insert({
        user_id: userId,
        name: bookingName.trim(),
        email: bookingEmail.trim(),
        scheduled_date: format(selectedDate, "yyyy-MM-dd"),
        scheduled_time: selectedTime,
        booking_type: 'consultation',
        status: 'confirmed'
      });

      if (dbError) {
        console.error('Error saving booking to database:', dbError);
        toast.error("Booking failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Send booking confirmation email
      const bookingData = {
        name: bookingName.trim(),
        email: bookingEmail.trim(),
        subject: `Consultation Booking Confirmation - ${format(selectedDate, "MMMM do, yyyy")} at ${selectedTime}`,
        message: `Consultation booked for ${format(selectedDate, "EEEE, MMMM do, yyyy")} at ${selectedTime}. Duration: 30 minutes. Format: Video call.`,
        type: 'booking'
      };

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify(bookingData),
          });
        } catch (emailError) {
          console.error('Email notification failed:', emailError);
        }
      }

      setIsBooked(true);
      toast.success("Booking Confirmed", {
        description: "You will receive a confirmation email shortly.",
      });

      setTimeout(() => {
        setIsBooked(false);
        setIsOpen(false);
        setSelectedDate(undefined);
        setSelectedTime("");
        setBookingName("");
        setBookingEmail("");
      }, 2000);
    } catch (error) {
      console.error('Error processing booking:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Connect with Coach K
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Book Your Consultation
          </DialogTitle>
          <DialogDescription className="sr-only">Schedule a consultation date and time.</DialogDescription>
        </DialogHeader>
        
        {isBooked ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Consultation Booked!</h3>
            <p className="text-muted-foreground">
              {selectedDate && selectedTime && (
                <>Your consultation is scheduled for {format(selectedDate, "EEEE, MMMM do")} at {selectedTime}</>
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="booking-name" className="text-sm font-medium">Your Name *</Label>
                <Input id="booking-name" value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder="Full name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booking-email" className="text-sm font-medium">Email Address *</Label>
                <Input id="booking-email" type="email" value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Select a Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() || !isWeekday(date)
                }
                className={cn("p-3 pointer-events-auto border rounded-md")}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Available weekdays only
              </p>
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Select a Time
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Consultation Summary</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Date:</strong> {format(selectedDate, "EEEE, MMMM do, yyyy")}<br />
                  <strong>Time:</strong> {selectedTime}<br />
                  <strong>Duration:</strong> 30 minutes<br />
                  <strong>Format:</strong> Video call
                </p>
                <Button onClick={handleBooking} className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingCalendar;