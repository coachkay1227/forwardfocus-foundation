import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Bell, Users, Mail, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const RealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Set up realtime subscriptions for all admin-relevant tables
    const channels = [
      // Partner referrals
      supabase
        .channel('referrals-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'partner_referrals'
          },
          (payload) => {
            addNotification({
              type: 'referral',
              title: 'New Partner Referral',
              message: `New referral: ${payload.new.name}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe(),

      // Partnership requests
      supabase
        .channel('partnership-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'partnership_requests'
          },
          (payload) => {
            addNotification({
              type: 'partnership',
              title: 'New Partnership Request',
              message: `Request from ${payload.new.organization}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe(),

      // Contact submissions
      supabase
        .channel('contact-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'contact_submissions'
          },
          (payload) => {
            addNotification({
              type: 'contact',
              title: 'New Contact Submission',
              message: `Message from ${payload.new.name}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe(),

      // Support requests
      supabase
        .channel('support-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'support_requests'
          },
          (payload) => {
            addNotification({
              type: 'support',
              title: 'New Support Request',
              message: `${payload.new.request_type} from ${payload.new.name}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe(),

      // Bookings
      supabase
        .channel('booking-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'bookings'
          },
          (payload) => {
            addNotification({
              type: 'booking',
              title: 'New Booking Request',
              message: `${payload.new.booking_type} from ${payload.new.name}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe(),

      // Security alerts
      supabase
        .channel('security-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'security_alerts'
          },
          (payload) => {
            addNotification({
              type: 'security',
              title: 'Security Alert',
              message: `${payload.new.severity}: ${payload.new.description}`,
              timestamp: new Date()
            });
          }
        )
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50

    // Show toast
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'referral':
      case 'partnership':
        return <Users className="w-4 h-4" />;
      case 'contact':
      case 'support':
        return <Mail className="w-4 h-4" />;
      case 'booking':
        return <Calendar className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
