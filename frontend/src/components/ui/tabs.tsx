import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}
export const Tabs = ({ children }: TabsProps) => <div>{children}</div>;

export const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex space-x-1', className)} {...props} />
);

export const TabsTrigger = ({ value, children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) => (
  <button data-value={value} className={cn('px-3 py-1 rounded', className)} {...props}>
    {children}
  </button>
);

export const TabsContent = ({ value, children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) => (
  <div data-value={value} className={cn('', className)} {...props}>
    {children}
  </div>
);