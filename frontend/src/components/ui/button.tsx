import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'ghost'
          ? 'bg-transparent hover:bg-gray-100'
          : 'bg-blue-600 text-white hover:bg-blue-700',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';