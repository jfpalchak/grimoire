import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMonster } from '@/lib/services';
import { proficiencies } from '@/utils/proficiencies';
import { modifier } from '@/utils/modifier';
import { shortUrl, formatActionMD, formatMonsterAC } from '@/utils/format';
import type { Action } from '@/types';

import Markdown from '@/components/markdown';
import Card, { Attribute } from '@/components/stat-card';

type StatProps = {
  ability: string;
  score: number;
};

const Stat = ({ ability, score }: StatProps) => {
  const sign = score < 10 ? '' : '+' ;
  return (
    <div>
      <div className="font-semibold uppercase">{ability.substring(0,3)}</div>
      <div>{`${score} (${sign}${modifier(score)})`}</div>
    </div>
  );
};

type ActionBlockProps = {
  actions: Action[];
  className: string;
  header?: string;
  desc?: string;
};

const ActionBlock = ({ actions, header, desc, className }: ActionBlockProps) => {
  return (
    <div className={className}>
      {header && (
        <h2 className="my-4 text-2xl text-red-900 border-b border-red-900">
          {header}
        </h2>
      )}
      {desc && (
        <p className="my-2">
          {desc}
        </p>
      )}
      {actions.map((action) => (
        <div key={action.name} className="my-1.5">
          <Markdown>
            {formatActionMD(action)}
          </Markdown>
        </div>
      ))}
    </div>
  );
};

export default async function MonsterCard({ index }: { index: any }) {

  const monster = await getMonster(index);

  if (!monster) {
    notFound();
  }

  return (
    <Card columns>
      <Card.Header>
        <Card.Title>
          {monster.name}
        </Card.Title>
        <Card.Subtitle>
          {monster.size} {monster.type}
          {!!monster.subtype && ` (${monster.subtype})`},
          {` ${monster.alignment}`}
        </Card.Subtitle>
      </Card.Header>

      <Card.Divider />

      <Card.StatBlock>
        <Attribute
          label="Armor Class"
          value={formatMonsterAC(monster.armor_class)}
        />
        <Attribute
          label="Hit Points"
          value={`${monster.hit_points} (${monster.hit_points_roll ?? monster.hit_dice})`}
        />
        <Attribute 
          label="Speed"
          value={
            Object.entries(monster.speed)
                  .map(([movement, feet]) => (movement === 'walk') ? feet : `${movement} ${feet}`)
                  .join(', ')
          }
        />
      </Card.StatBlock>

      <Card.Divider />

      {/* ABILITY SCORES */}
      <Card.StatBlock className="my-2 flex flex-wrap gap-4 text-center">
        {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const)
          .map((ability) => (
            <Stat
              ability={ability}
              score={monster[ability]}
            />
        ))}
      </Card.StatBlock>

      <Card.Divider />

      <Card.StatBlock>
        {proficiencies(monster.proficiencies).map((proficiency) => (
          <Attribute
            key={proficiency[0]}
            label={proficiency[0]}
            value={
              proficiency[1].map(({ stat, value, url }, i) => (
                <Fragment key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {stat}
                  </Link>
                  {` +${value}${i < proficiency[1].length - 1 ? ', ' : ''}`}
                </Fragment>
              ))
            }
          />
        ))}
        {monster.damage_vulnerabilities.length > 0 && (
          <Attribute
            label="Damage Vulnerabilities"
            value={monster.damage_vulnerabilities.join(', ')}
          />
        )}
        {monster.damage_resistances.length > 0 && (
          <Attribute
            label="Damage Resistances"
            value={monster.damage_resistances.join(', ')}
          />
        )}
        {monster.damage_immunities.length > 0 && (
          <Attribute
            label="Damage Immunities"
            value={monster.damage_immunities.join(', ')}
          />
        )}
        {monster.condition_immunities.length > 0 && (
          <Attribute
            label="Condition Immunities"
            value={
              monster.condition_immunities.map(({ name, index, url }, i) => (
                <Fragment key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {name}
                  </Link>
                  {i < monster.condition_immunities.length - 1 && ', '}
                </Fragment>
              ))
            }
          />
        )}
        {monster.senses && (
          <Attribute
            label="Senses"
            value={
              Object.entries(monster.senses)
                    .map(([sense, stat]) => (`${sense.replaceAll('_', ' ')} ${stat}`))
                    .join(', ')
            }
          />
        )}
        {monster.languages && (
          <Attribute
            label="Languages"
            value={monster.languages}
          />
        )}
        <div className="flex gap-6">
          <Attribute
            label="Challenge"
            value={`${monster.challenge_rating} (${monster.xp} XP)`}
          />
          <Attribute
            label="Proficiency Bonus"
            value={`+${monster.proficiency_bonus}`}
          />
        </div>
      </Card.StatBlock>

      <Card.Divider />

      <Card.Content>
        <ActionBlock
          actions={monster.special_abilities}
          className="mt-5"
        />
        <ActionBlock 
          header="Actions"
          actions={monster.actions}
          className="mt-2"
        />
        {monster.legendary_actions.length > 0 && (
          <ActionBlock 
            header="Legendary Actions"
            desc={
              `The ${monster.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${monster.name} regains spent legendary actions at the start of its turn.`
            }
            actions={monster.legendary_actions}
            className="mt-2 [&_strong]:not-italic"
          />
        )}
      </Card.Content>

      <Card.Footnote>
        {monster.desc && (
          <div className="mt-4">
            <h2 className="mb-2 text-2xl">
              Description
            </h2>
            <Markdown>
              {monster.desc}
            </Markdown>
          </div>
        )}
      </Card.Footnote>
    </Card>
  );
}
