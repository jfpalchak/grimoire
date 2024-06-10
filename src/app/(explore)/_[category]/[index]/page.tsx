import React, { Suspense } from 'react';
import CardContent from '@/components/card-content';

type Props = {
  params: {
    category: string;
    index: string;
  }
};

export default async function IndexPage({ params }: Props) {
  const { category, index } = params;

  return (
    <section className="m-10">
      <header className="mb-5 border-b-2">
        <p className="font-semibold">Category: {category}</p>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <CardContent category={category} index={index} />
      </Suspense>
    </section>
  );
}