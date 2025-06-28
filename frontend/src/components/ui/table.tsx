import * as React from 'react';
import { cn } from '../../lib/utils';

export const Table = ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <table className={cn('w-full border-collapse', className)} {...props} />
);
export const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('', className)} {...props} />
);
export const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('', className)} {...props} />
);
export const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('border-b', className)} {...props} />
);
export const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className={cn('px-4 py-2 text-left text-sm font-medium text-gray-600', className)} {...props} />
);
export const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td className={cn('px-4 py-2 text-sm text-gray-700', className)} {...props} />
);