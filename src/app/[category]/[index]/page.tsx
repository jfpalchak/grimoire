import React, { Suspense } from 'react';
import CardContent from '@/components/card-content';

export default async function IndexPage({ params }: { params: { index: string, category: string }}) {
  const { category, index } = params;

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: {category}</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <CardContent category={category} index={index} />
      </Suspense>
    </section>
  );
}