import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import {
  type ProficiencyData,
  proficiencies,
  modifier,
  shortUrl,
  formatActionMD,
} from '@/lib/utils';

import Markdown from '../markdown';

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
          value={monster.armor_class.map(({ type, value, armor }) => `${value} (${type})`).join(', ')}
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
        <div>
          {proficiencies(monster.proficiencies).map((data) => (
            <Proficiency key={data[0]} stats={data} />
            // <Attribute 
            //   key={proficiency[0]}
            //   name={proficiency[0]}
            //   className="flex"
            //   value={
            //     <ul className="flex gap-1 list-comma">
            //       {proficiency[1].map(({ stat, value, url }) => (
            //         <li key={url}>
            //           <Link href={shortUrl(url)} className="hover:underline">
            //             {stat}
            //           </Link>
            //           {` +${value}`}
            //         </li>
            //         ))}
            //     </ul>
            //   }
            // />
          ))}
        </div>
        {monster.damage_vulnerabilities.length > 0 && (
          <Attribute name="Damage Vulnerabilities" value={monster.damage_vulnerabilities.join(', ')} />
        )}
        {monster.damage_resistances.length > 0 && (
          <Attribute name="Damage Resistances" value={monster.damage_resistances.join(', ')} />
        )}
        {monster.damage_immunities.length > 0 && (
          <Attribute name="Damage Immunities" value={monster.damage_immunities.join(', ')} />
        )}
        {monster.condition_immunities.length > 0 && (
          <div className="flex gap-1">
            <span className="font-semibold">
              Condition Immunities:
            </span> 
            <ul className="flex gap-1 list-comma">
              {monster.condition_immunities.map(({ name, index, url }) => (
                <li key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          // <Attribute
          //   name="Condition Immunities"
          //   className="flex"
          //   value={
          //     <ul className="flex gap-1 list-comma">
          //       {monster.condition_immunities.map(({ name, index, url }) => (
          //         <li key={index}>
          //           <Link href={shortUrl(url)} className="hover:underline">
          //             {name}
          //           </Link>
          //         </li>
          //       ))}
          //     </ul>
          //   }
          // />
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
          <Attribute name="Languages" value={monster.languages} />
        )}

        {/* CHALLENGE RATING */}
        <div className="flex gap-6">
          <Attribute name="Challenge" value={`${monster.challenge_rating} (${monster.xp} XP)`} />
          <Attribute name="Proficiency Bonus" value={`+${monster.proficiency_bonus}`} />
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

      {/* LEGENDARY ACTIONS */}
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

const Attribute = ({ name, value, className }: { name: string, value: JSX.Element | string, className?: string }) => {
  return (
    <div className={className}>
      <span className="font-semibold">
        {name}:&nbsp;
      </span>
      <span>
        {value}
      </span>
    </div>
  );
}

const Proficiency = ({ stats }: { stats: [string, ProficiencyData[]] }) => {
  const [proficiency, abilities] = stats;
  return (
    <div className="flex gap-1">
      <span className="font-bold">
        {proficiency}:
      </span>
      <ul className="flex gap-1 list-comma">
        {abilities.map(({ stat, value, url }) => (
          <li key={url}>
            <Link href={shortUrl(url)} className="hover:underline">
              {stat}
            </Link>
            {` +${value}`}
          </li>
          ))}
      </ul>
    </div>
  );
};

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
