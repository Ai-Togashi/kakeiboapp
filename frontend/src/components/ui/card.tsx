import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('bg-white rounded-lg shadow p-4', className)} {...props} />;
}
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn('mb-2', className)} {...props} />;
}
export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cn('text-sm text-gray-500', className)} {...props} />;
}
export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn('', className)} {...props} />;
}