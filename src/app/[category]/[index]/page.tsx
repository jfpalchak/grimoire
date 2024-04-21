import React, { Suspense } from 'react';
import CardContent from '@/components/card-content';

interface Props {
  params: {
    category: string;
    index: string;
  }
}

export default async function IndexPage({ params }: Props) {
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