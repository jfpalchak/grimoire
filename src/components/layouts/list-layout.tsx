'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Search from '@/components/ui/search';

type Props = {
  children: React.ReactNode;
};

export default function ListLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Explore {pathname}</p>
        <br/>
        <Suspense>
          <Search />
        </Suspense>
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}