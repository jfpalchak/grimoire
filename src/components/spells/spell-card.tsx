import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getSpell } from '@/lib/services';
import { formatSpellMD, shortUrl } from '@/utils/format';
import Markdown from '@/components/markdown';
import type { DamageDice } from '@/types';
import Card from '../stat-card';

type TableProps = {
  data: Record<string, string>;
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
        <tr key={`${level}_${dice}`}>
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
    <Card>
      {/* HEADER */}
      <Card.Header>
        <Card.Title>
          {spell.name}
        </Card.Title>
        <Card.Subtitle>
          {spell.level ? `level ${spell.level}` : 'cantrip'}
          {' - '}
          <Link href={shortUrl(spell.school.url)} className="hover:underline">
            {spell.school.name}
          </Link>
          {spell.ritual && ' (ritual)'}
        </Card.Subtitle>
      </Card.Header>

      <Card.Content>
        {/* STAT BLOCK */}
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
            </p>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="mt-2 highlight-saving-throw">
          <Markdown>
            {formatSpellMD(spell.desc)}
          </Markdown>
        </div>
        {spell.higher_level && spell.higher_level.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            <span className="font-semibold italic">
              At Higher Levels:
            </span>
            <Markdown>
              {formatSpellMD(spell.higher_level)}
            </Markdown>
          </div>
        )}

        {/* DAMAGE / HEAL DICE */}
        {spell.damage && (
          <div className="mt-2">
            {Object.keys(spell.damage).map((key) => {
              if (key !== 'damage_type') {
                return (
                  <DiceTable
                    key={key}
                    data={spell.damage![key] as DamageDice}
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

        {/* CLASS LIST */}
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
      </Card.Content>
    </Card>
  );
}
