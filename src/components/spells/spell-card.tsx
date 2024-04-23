import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSpell, dnd } from '@/lib/services';

import ParsedMarkdown from '@/components/markdown';

interface LevelDice {
  [level: string]: string;
}

interface TableProps {
  data: LevelDice;
  caption: string;
  stat: string;
}

const DiceTable = ({ data, stat, caption}: TableProps) => {
  return (
    <table className="w-60 text-center">
      <caption className="font-semibold">{caption}</caption>
      <thead>
        <tr>
          <th>Level</th>
          <th>{stat}</th>
        </tr>
      </thead>
      <tbody>
      {Object.entries(data).map(([level, dice]) => (
        <tr key={`${level}_damage`}>
          <td>{level}</td>
          <td>{dice}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default async function SpellCard({ index }: { index: any }) {  

  // const spell = await getSpell(index);
  const spell = await dnd.spells.get(index);
  
  if (!spell) {
    notFound();
  }

  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {spell.name}
      </h1>
      <p className="my-3 italic">
        {spell.level ? `level ${spell.level}` : 'cantrip'}
        {' - '}
        <Link href={`/magic-schools/${spell.school.index}`} className="hover:underline">
          {spell.school.name}
        </Link>
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
        {spell.area_of_effect && ` (${spell.area_of_effect.size}-foot ${spell.area_of_effect.type})`}
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

      <div className="mt-2 flex gap-1">
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

      {/* DESCRIPTION */}
      <div className="mt-2 flex flex-col gap-1 [&_h5]:font-semibold [&_h5]:text-center [&_table]:text-center [&_ul]:pl-6 [&_ul]:list-disc">
        {/* Format any markdown text to properly render on the DOM: */}
        <ParsedMarkdown>
          {spell.desc.reduce((article, row, i) => {
            if (row.includes('|') && spell.desc[i + 1]?.includes('|')) {
              return article + row + '\n';
            } else {
              return article + row + '\n\n';
            }
          }, '')}
        </ParsedMarkdown>
      </div>
      {spell.higher_level && spell.higher_level.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold italic">
            At Higher Levels:
          </span>
          {spell.higher_level.map((paragraph, i) => (
            <div key={`higher_level_${i}`}>
              <ParsedMarkdown>
                {paragraph}
              </ParsedMarkdown>
            </div>
          ))}
        </div>
      )}

      {/* SPELL DC & DAMAGE / HEAL DICE*/}
      {spell.damage && (
        <div className="mt-2">
          {Object.keys(spell.damage).map((key) => {
            if (key !== 'damage_type') {
              return (
                <DiceTable
                  key={key}
                  data={spell.damage![key]}
                  caption={`Damage per ${key.includes('slot') ? 'Slot' : 'Character'} Level`}
                  stat="Damage"
                />
              );
            }
          })}
        </div>
      )}

      {spell.heal_at_slot_level && (
        <div className="mt-2">
          <DiceTable
            data={spell.heal_at_slot_level}
            caption="Heal per Slot Level"
            stat="Health"
          />
        </div>
      )}

      {spell.dc && (
        <div className="mt-2">
          <p>
            <span className="font-semibold">
              Saving Throw:&nbsp;
            </span>
            <Link href={`/ability-scores/${index}`} className="hover:underline">
              {spell.dc.dc_type.name}
            </Link>
            {` (effect: ${spell.dc.dc_success})`}
          </p>
        </div>
      )}
    </div>
  )
}
