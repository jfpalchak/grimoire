import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSpell } from '@/lib/services';

export default async function SpellCard({ index }: { index: any }) {
  const spell = await getSpell(index);
  
  if (!spell) {
    notFound();
  }

  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {spell.name}
      </h1>
      <p className="my-3 italic">
        {spell.level ? `level ${spell.level} ` : 'cantrip '}
        {`- ${spell.school.name} `}
        {spell.ritual && '(ritual)'}
      </p>
      <p>
        <span className="font-semibold">
          Casting Time:&nbsp;
        </span>
        {spell.casting_time}
      </p>
      <p>
        <span className="font-semibold">
          Range:&nbsp;
        </span>
        {spell.range}
      </p>
      <p>
        <span className="font-semibold">
          Components:&nbsp;
        </span>
        {spell.components.join(', ')}
        {spell.material && ` (${spell.material})`}
      </p>
      <p>
        <span className="font-semibold">
          Duration:&nbsp;
        </span>
        {spell.concentration && 'Concentration, '}
        {spell.duration}
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Classes:
        </span>
        <ul className="flex gap-1">
          {spell.classes.map(({ name, index }) => (
            <li key={index} className="[&:not(:last-child)]:after:content-[',']">
              <Link href={`/classes/${index}`} className="hover:underline">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {spell.desc.map((paragraph, i) => (
          <p key={i}>
            {paragraph}
          </p>
        ))}
      </div>
      {spell.higher_level && spell.higher_level.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold italic">
            At Higher Levels:
          </span>
          {spell.higher_level.map((paragraph, i) => (
            <p key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
