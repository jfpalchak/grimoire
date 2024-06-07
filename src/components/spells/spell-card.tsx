import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getSpell } from '@/lib/services';
import { formatDescMD, comma } from '@/utils/format';
import type { DamageDice } from '@/types';

import Markdown from '@/components/markdown';
import Card, { Attribute } from '@/components/stat-card';
import ReferenceLink from '@/components/reference-link';

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

export default async function SpellCard({ index }: { index: string }) {  

  const spell = await getSpell(index);
  
  if (!spell) {
    notFound();
  }

  const aoe = spell.area_of_effect ? `(${spell.area_of_effect.size}-foot ${spell.area_of_effect.type})` : '';
  const range = `${spell.range} ${aoe}`;
  const materials = spell.material ? `(${spell.material})` : '';
  const components = `${spell.components.join(', ')} ${materials}`;
  const concentration = spell.concentration ? 'Concentration,' : '';
  const duration = `${concentration} ${spell.duration}`;

  const spellMeta = (
    <>
      {spell.level ? `level ${spell.level}` : 'cantrip'}
      {' - '}
      <ReferenceLink href={spell.school.url}>
        {spell.school.name}
      </ReferenceLink>
      {spell.ritual && ' (ritual)'}
    </>
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {spell.name}
        </Card.Title>
        <Card.Subtitle>
          {spellMeta}
        </Card.Subtitle>
      </Card.Header>

      <Card.Content>
        {/* STAT BLOCK */}
        <Attribute label="Casting Time" value={spell.casting_time} />
        <Attribute label="Range" value={range} />
        <Attribute label="Components" value={components} />
        <Attribute label="Duration" value={duration} />
        {spell.dc && (
          <Attribute
            label="Saving Throw"
            className="mt-2 w-fit saving-throw peer"
            value={
              <ReferenceLink href={spell.dc.dc_type.url}>
                {spell.dc.dc_type.name}
              </ReferenceLink>
            }
          />
        )}

        {/* DESCRIPTION */}
        <div className="mt-2 highlight-saving-throw">
          <Markdown>
            {formatDescMD(spell.desc)}
          </Markdown>
        </div>
        {spell.higher_level && spell.higher_level.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            <span className="font-semibold italic">
              At Higher Levels:
            </span>
            <Markdown>
              {formatDescMD(spell.higher_level)}
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
        <Attribute 
          label="Classes"
          className="mt-5"
          value={
            spell.classes.map(({ name, index, url }, i) => (
              <Fragment key={index}>
                <ReferenceLink href={url}>
                  {name}
                </ReferenceLink>
                {comma(spell.classes, i)}
              </Fragment>
            ))
          }
        />
      </Card.Content>
    </Card>
  );
}
