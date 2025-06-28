import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn('block w-full rounded-md border border-gray-300 bg-white px-3 py-2', className)}
      {...props}
    >
      {children}
    </select>
  );
}

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  return (
    <div className={cn('cursor-pointer border border-gray-300 rounded px-2 py-1', className)} {...props}>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectContent({ children, className, ...props }: SelectContentProps) {
  return <div className={cn('mt-1 border border-gray-200 rounded bg-white', className)} {...props}>{children}</div>;
}

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export function SelectItem({ value, children, ...props }: SelectItemProps) {
  return (
    <div data-value={value} {...props} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
      {children}
    </div>
  );
}