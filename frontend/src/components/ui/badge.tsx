import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'destructive';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        variant === 'destructive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800',
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';