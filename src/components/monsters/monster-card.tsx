import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getMonster } from '@/lib/rest/services';
import { proficiencies } from '@/utils/proficiencies';
import { modifier } from '@/utils/modifier';
import {
  comma,
  formatActionMD,
  formatMonsterAC,
  formatMonsterSpeed,
  formatMonsterSenses
} from '@/utils/format';
import type { Action } from '@/types';

import Markdown from '@/components/markdown';
import Card, { Attribute } from '@/components/stat-card';
import ReferenceLink from '@/components/reference-link';

type ActionBlockProps = {
  actions: Action[];
  className: string;
  header?: string;
  desc?: string;
};

const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;

const legendaryDesc = ({ name }: { name: string }) => (
  `The ${name} can take 3 legendary actions, choosing from the options below.
  Only one legendary action option can be used at a time and only at the end of another creature\'s turn.
  The ${name} regains spent legendary actions at the start of its turn.`
);

const AbilityScore = ({ ability, score }: { ability: string, score: number }) => {
  const sign = score < 10 ? '' : '+' ;
  return (
    <div className="w-[30%] py-1 md:w-[15%]">
      <div className="font-semibold uppercase">{ability.substring(0, 3)}</div>
      <div>{`${score} (${sign}${modifier(score)})`}</div>
    </div>
  );
};

const ActionBlock = ({ actions, header, desc, className }: ActionBlockProps) => (
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

export default async function MonsterCard({ index }: { index: any }) {

  const monster = await getMonster(index);

  if (!monster) {
    notFound();
  }

  const monsterMeta = `${monster.size} ${monster.type}${monster.subtype ? ` (${monster.subtype})` : ''}, ${monster.alignment}`;
  const ac = formatMonsterAC(monster.armor_class);
  const hp = `${monster.hit_points} (${monster.hit_points_roll ?? monster.hit_dice})`;
  const speed = formatMonsterSpeed(monster.speed);
  const vulnerabilities = monster.damage_vulnerabilities.join(', ');
  const resistances = monster.damage_resistances.join(', ');
  const immunities = monster.damage_immunities.join(', ');
  const senses = monster.senses && formatMonsterSenses(monster.senses);
  const challengeXP = `${monster.challenge_rating} (${monster.xp} XP)`;
  const profBonus = `+${monster.proficiency_bonus}`;

  return (
    <Card columns>
      <Card.Header>
        <Card.Title>
          {monster.name}
        </Card.Title>
        <Card.Subtitle>
          {monsterMeta}
        </Card.Subtitle>
      </Card.Header>

      <Card.Divider />

      <Card.StatBlock>
        <Attribute label="Armor Class" value={ac} />
        <Attribute label="Hit Points" value={hp} />
        <Attribute label="Speed" value={speed} />
      </Card.StatBlock>

      <Card.Divider />

      <Card.StatBlock className="my-2 flex flex-wrap justify-around text-center">
        {abilities.map((ability) => (
          <AbilityScore
            key={ability}
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
                  <ReferenceLink href={url}>
                    {stat}
                  </ReferenceLink>
                  {` +${value}${comma(proficiency[1], i)}`}
                </Fragment>
              ))
            }
          />
        ))}
        {vulnerabilities && (
          <Attribute label="Damage Vulnerabilities" value={vulnerabilities} />
        )}
        {resistances && (
          <Attribute label="Damage Resistances" value={resistances} />
        )}
        {immunities && (
          <Attribute label="Damage Immunities" value={immunities} />
        )}
        {monster.condition_immunities.length > 0 && (
          <Attribute
            label="Condition Immunities"
            value={
              monster.condition_immunities.map(({ name, index, url }, i) => (
                <Fragment key={index}>
                  <ReferenceLink href={url}>
                    {name}
                  </ReferenceLink>
                  {comma(monster.condition_immunities, i)}
                </Fragment>
              ))
            }
          />
        )}
        {senses && (
          <Attribute label="Senses" value={senses} />
        )}
        {monster.languages && (
          <Attribute label="Languages" value={monster.languages} />
        )}
        <div className="flex gap-6">
          <Attribute label="Challenge" value={challengeXP} />
          <Attribute label="Proficiency Bonus" value={profBonus} />
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
            desc={legendaryDesc(monster)}
            actions={monster.legendary_actions}
            className="mt-2 [&_strong]:not-italic"
          />
        )}
      </Card.Content>

      <Card.Footnote>
        {monster.desc && (
          <Markdown>
            {monster.desc}
          </Markdown>
        )}
      </Card.Footnote>
    </Card>
  );
}
