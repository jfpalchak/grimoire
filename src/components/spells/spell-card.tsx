import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getSpell } from '@/lib/services';
import { formatMD, shortUrl } from '@/lib/utils';
import Markdown from '@/components/markdown';

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
    <table>
      <caption className="font-semibold">
        {caption}
      </caption>
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
        {spell.level ? `level ${spell.level}` : 'cantrip'}
        {' - '}
        <Link href={shortUrl(spell.school.url)} className="hover:underline">
          {spell.school.name}
        </Link>
        {spell.ritual && ' (ritual)'}
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
      {spell.dc && (
        <div className="mt-2 w-fit saving-throw peer">
          <p>
            <span className="font-semibold">
              Saving Throw:&nbsp;
            </span>
            <Link href={shortUrl(spell.dc.dc_type.url)} className="hover:underline">
              {spell.dc.dc_type.name}
            </Link>
            {/* {` (effect: ${spell.dc.dc_success})`} */}
          </p>
        </div>
      )}

      {/* DESCRIPTION */}
      <div className="mt-2 highlight-saving-throw">
        <Markdown>
          {formatMD(spell.desc)}
        </Markdown>
      </div>
      {spell.higher_level && spell.higher_level.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold italic">
            At Higher Levels:
          </span>
          <Markdown>
            {formatMD(spell.higher_level)}
          </Markdown>
        </div>
      )}

      {/* DAMAGE / HEAL DICE*/}
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

      <div className="mt-5 flex gap-1">
        <span className="font-semibold">
          Classes:
        </span>
        <ul className="flex gap-1 list-comma">
          {spell.classes.map(({ name, index, url }) => (
            <li key={index}>
              <Link href={shortUrl(url)} className="hover:underline">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
