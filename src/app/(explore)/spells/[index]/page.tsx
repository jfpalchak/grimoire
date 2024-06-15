import { Suspense } from 'react';
import SpellCard from '@/components/spells/spell-card';

type Props = {
  params: {
    index: string;
  }
}

export default async function SpellPage({ params: { index } }: Props) {

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Spells!</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <SpellCard index={index} />
      </Suspense>
    </section>
  );
}
