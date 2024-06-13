'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

type RefProps = {
  className?: string;
} & PropsWithChildren;

type RefItemProps = { 
  index: string;
} & RefProps;

export const RefHeader = ({ className, children }: RefProps) => (
  <h5 className={cn(className, 'font-medium')}>
    {children}
  </h5>
);

export const RefText = ({ className, children }: RefProps) => (
  <div className={cn(className, 'text-sm font-extralight')}>{children}</div>
);

export const ReferenceItem = ({ index, className, children }: RefItemProps) => {
  const path = usePathname();
  return (
    <Link
      href={`${path}/${index}`}
      className={cn(className,
        'w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow'
      )}
    >
      <div className="p-4">
        {children}
      </div>
    </Link>
  );
};
