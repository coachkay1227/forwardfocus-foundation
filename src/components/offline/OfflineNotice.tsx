import { WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const OfflineNotice = () => {
  return (
    <Alert className="mb-4 border-yellow-500 bg-yellow-50 text-yellow-800">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        You're currently in offline mode. Some features may be limited. External services and real-time data are unavailable.
      </AlertDescription>
    </Alert>
  );
};