import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import {
  proficiencies,
  modifier,
  shortUrl,
  formatActionMD,
} from '@/lib/utils';

import Markdown from '@/components/markdown';

export default async function MonsterCard({ index }: { index: any }) {

  const monster = await getMonster(index);

  if (!monster) {
    notFound();
  }

  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-red-900">
          {monster.name}
        </h1>
        <div className="mt-1 mb-4 italic">
          {monster.size} {monster.type}
          {!!monster.subtype && ` (${monster.subtype})`},
          {` ${monster.alignment}`}
        </div>
      </div>

      <Divider />

      {/* ATTRIBUTES */}
      <div className="text-red-900">
        <Attribute
          name="Armor Class"
          value={monster.armor_class.map(({ type, value, armor, spell, condition }) => `${value} (${condition?'while '+condition.name:type}${spell?': '+spell.name:armor?': '+armor.map((a)=>a.name).join(', '):''})`).join(', ')}
        />
        <Attribute
          name="Hit Points"
          value={`${monster.hit_points} (${monster.hit_points_roll ?? monster.hit_dice})`}
        />
        <Attribute 
          name="Speed"
          value={
            Object.entries(monster.speed)
                  .map(([movement, feet]) => (movement === 'walk') ? feet : `${movement} ${feet}`)
                  .join(', ')
          }
        />
      </div>

      <Divider />

      {/* ABILITY SCORES */}
      <div className="my-2 flex flex-wrap gap-4 text-center text-red-900">
        <Stat ability='STR' score={monster.strength} />
        <Stat ability='DEX' score={monster.dexterity} />
        <Stat ability='CON' score={monster.constitution} />
        <Stat ability='INT' score={monster.intelligence} />
        <Stat ability='WIS' score={monster.wisdom} />
        <Stat ability='CHA' score={monster.charisma} />
      </div>

      <Divider />

      {/* PROFICIENCIES & STATS */}
      <div className="text-red-900">
        {proficiencies(monster.proficiencies).map((proficiency) => (
          <Attribute
            key={proficiency[0]}
            name={proficiency[0]}
            value={
              proficiency[1].map(({ stat, value, url }, _index) => (
                <Fragment key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {stat}
                  </Link>
                  {` +${value}${_index < proficiency[1].length - 1 ? ', ' : ''}`}
                </Fragment>
              ))
            }
          />
        ))}
        {monster.damage_vulnerabilities.length > 0 && (
          <Attribute
            name="Damage Vulnerabilities"
            value={monster.damage_vulnerabilities.join(', ')}
          />
        )}
        {monster.damage_resistances.length > 0 && (
          <Attribute
            name="Damage Resistances"
            value={monster.damage_resistances.join(', ')}
          />
        )}
        {monster.damage_immunities.length > 0 && (
          <Attribute
            name="Damage Immunities"
            value={monster.damage_immunities.join(', ')}
          />
        )}
        {monster.condition_immunities.length > 0 && (
          <Attribute
            name="Condition Immunities"
            value={
              monster.condition_immunities.map(({ name, index, url }, _index) => (
                <Fragment key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {name}
                  </Link>
                  {_index < monster.condition_immunities.length - 1 && ', '}
                </Fragment>
              ))
            }
          />
        )}
        {monster.senses && (
          <Attribute
            name="Senses"
            value={
              Object.entries(monster.senses)
                    .map(([sense, stat]) => (`${sense.replaceAll('_', ' ')} ${stat}`))
                    .join(', ')
            }
          />
        )}
        {monster.languages && (
          <Attribute
            name="Languages"
            value={monster.languages}
          />
        )}
        <div className="flex gap-6">
          <Attribute
            name="Challenge"
            value={`${monster.challenge_rating} (${monster.xp} XP)`}
          />
          <Attribute
            name="Proficiency Bonus"
            value={`+${monster.proficiency_bonus}`}
          />
        </div>
      </div>

      <Divider />

      {/* TRAITS */}
      <AbilityBlock
        actions={monster.special_abilities}
        className="mt-5"
      />

      {/* ACTIONS */}
      <AbilityBlock 
        header="Actions"
        actions={monster.actions}
        className="mt-2"
      />
      {monster.legendary_actions.length > 0 && (
        <AbilityBlock 
          header="Legendary Actions"
          desc={
            `The ${monster.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${monster.name} regains spent legendary actions at the start of its turn.`
          }
          actions={monster.legendary_actions}
          className="mt-2 [&_strong]:not-italic"
        />
      )}

      {/* ADDITIONAL INFO */}
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

    </div>
  );
}

const Divider = () => <div className="my-2 border-b-2 border-red-800" />;

const Stat = ({ ability, score }: { ability: string, score: number }) => {
  return (
    <div>
      <div className="font-semibold">{ability}</div>
      <div>{`${score} (${(score<10?'':'+') + modifier(score)})`}</div>
    </div>
  );
};

interface AttributeProps {
  name: string;
  value: string | JSX.Element[];
  className?: string;
}

const Attribute = ({ name, value, className }: AttributeProps) => {
  return (
    <div className={className}>
      <span className="font-semibold">
        {name + ': '}
      </span>
      <span>
        {value}
      </span>
    </div>
  );
}

interface AbilityBlockProps {
  actions: Action[];
  className: string;
  header?: string;
  desc?: string;
};

const AbilityBlock = ({ actions, header, desc, className }: AbilityBlockProps) => {
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
