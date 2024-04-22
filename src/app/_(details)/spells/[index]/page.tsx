import SpellCard from '@/components/spells/spell-card';

export default async function SpellPage({ params }: { params: { index: string }}) {
  const { index } = params;

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Spells!</p>
      </div>
      <SpellCard index={index} />
    </section>
  );
}