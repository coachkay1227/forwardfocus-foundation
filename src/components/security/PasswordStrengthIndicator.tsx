import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

interface StrengthCheck {
  label: string;
  test: (password: string) => boolean;
}

const strengthChecks: StrengthCheck[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p) => /[0-9]/.test(p) },
];

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className
}) => {
  if (!password) return null;

  const passedChecks = strengthChecks.filter(check => check.test(password));
  const strength = passedChecks.length / strengthChecks.length;
  
  const getStrengthColor = (strength: number) => {
    if (strength < 0.33) return 'bg-destructive';
    if (strength < 0.67) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 0.33) return 'Weak';
    if (strength < 0.67) return 'Fair';
    return 'Strong';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              getStrengthColor(strength)
            )}
            style={{ width: `${strength * 100}%` }}
          />
        </div>
        <span className={cn(
          "text-sm font-medium",
          strength < 0.33 && "text-destructive",
          strength >= 0.33 && strength < 0.67 && "text-warning", 
          strength >= 0.67 && "text-success"
        )}>
          {getStrengthText(strength)}
        </span>
      </div>
      
      <ul className="space-y-1">
        {strengthChecks.map((check, index) => (
          <li
            key={index}
            className={cn(
              "text-xs flex items-center space-x-2",
              check.test(password) ? "text-success" : "text-muted-foreground"
            )}
          >
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              check.test(password) ? "bg-success" : "bg-muted-foreground"
            )} />
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};