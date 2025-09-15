import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { MessageCircle, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
      setTimeout(() => {
        setIsBooked(false);
        setIsOpen(false);
        setSelectedDate(undefined);
        setSelectedTime("");
      }, 2000);
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
                <Button onClick={handleBooking} className="w-full">
                  Confirm Booking
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