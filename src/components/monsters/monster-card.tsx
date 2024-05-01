import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import {
  type ProficiencyData,
  proficiencies,
  modifier,
  shortUrl,
  formatMD,
  getActionUsage,
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
        <h1 className="text-3xl font-semibold text-red-800">
          {monster.name}
        </h1>
        <p className="mt-1 mb-4 italic">
          {monster.size} {monster.type}
          {!!monster.subtype && ` (${monster.subtype})`},
          {` ${monster.alignment}`}
        </p>
      </div>

      <Divider />

      {/* ATTRIBUTES */}
      <div>
        <p>
          <span className="font-semibold">
            Armor Class:&nbsp;
          </span>
          <span>
            {monster.armor_class.map(({ type, value, armor }) => `${value} (${type})`)
                                .join(', ')}
          </span>
        </p>
        <p>
          <span className="font-semibold">
            Hit Points:&nbsp;
          </span>
          <span>
            {monster.hit_points}
            {` (${monster.hit_points_roll ?? monster.hit_dice})`}
          </span>
        </p>
        <div className="flex gap-1">
          <span className="font-semibold">
            Speed:
          </span>
          <span>
            {Object.entries(monster.speed)
                    .map(([movement, feet]) => (movement === 'walk') ? feet : `${movement} ${feet}`)
                    .join(', ')}
          </span>
        </div>
      </div>

      <Divider />

      {/* ABILITY SCORES */}
      <div className="my-2 flex flex-wrap gap-4 text-center">
        <Stat ability='STR' score={monster.strength} />
        <Stat ability='DEX' score={monster.dexterity} />
        <Stat ability='CON' score={monster.constitution} />
        <Stat ability='INT' score={monster.intelligence} />
        <Stat ability='WIS' score={monster.wisdom} />
        <Stat ability='CHA' score={monster.charisma} />
      </div>

      <Divider />

      {/* PROFICIENCIES & STATS */}
      <div className="flex flex-col">
        {proficiencies(monster.proficiencies).map((data) => (
          <Proficiency key={data[0]} stats={data} />
        ))}
      </div>
      {monster.damage_vulnerabilities.length > 0 && (
        <div>
          <span className="font-semibold">
            Damage Vulnerabilities:&nbsp;
          </span> 
          <span>
            {monster.damage_vulnerabilities.join(', ')}
          </span>
        </div>
      )}
      {monster.damage_resistances.length > 0 && (
        <div>
          <span className="font-semibold">
            Damage Resistances:&nbsp;
          </span> 
          <span>
            {monster.damage_resistances.join(', ')}
          </span>
        </div>
      )}
      {monster.damage_immunities.length > 0 && (
        <div>
          <span className="font-semibold">
            Damage Immunities:&nbsp;
          </span> 
          <span>
            {monster.damage_immunities.join(', ')}
          </span>
        </div>
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
      )}
      {monster.senses && (
        <div>
          <span className="font-semibold">
            Senses:&nbsp;
          </span> 
          {Object.entries(monster.senses)
                  .map(([sense, stat]) => (`${sense.replaceAll('_', ' ')} ${stat}`))
                  .join(', ')}
        </div>
      )}
      {monster.languages && (
        <div>
          <span className="font-semibold">
            Languages:&nbsp;
          </span>
          <span>
            {monster.languages}
          </span>
        </div>
      )}

      {/* CHALLENGE RATING */}
      <div className="flex gap-6">
        <div>
          <span className="font-semibold">
            Challenge:&nbsp;
          </span>
          <span>
            {`${monster.challenge_rating} (${monster.xp} XP)`}
          </span>
        </div>
        <div>
          <span className="font-semibold">
            Proficiency Bonus:&nbsp;
          </span>
          <span>
            {`+${monster.proficiency_bonus}`}
          </span>
        </div>
      </div>

      <Divider />

      {/* TRAITS */}
      <AbilityBlock
        actions={monster.special_abilities}
        className="mt-5"
      />
      {/* <div className="mt-5">
        {monster.special_abilities.map((trait) => (
          <p key={trait.name} className="my-1.5">
            <strong>
              <em>
                {trait.name}
                {trait.usage && getActionUsage(trait.usage)}
                .&nbsp;
              </em>
            </strong>
            {trait.desc}
          </p>
        ))}
      </div> */}

      {/* ACTIONS */}
      <AbilityBlock 
        header="Actions"
        actions={monster.actions}
        className="mt-2"
      />
      {/* <div className="mt-2">
        <h2 className="my-4 text-2xl text-red-800 border-b-2 border-red-800">
          Actions
        </h2>
        {monster.actions.map((action) => (
          <p key={action.name} className="my-1.5">
            <strong>
              <em>
                {action.name}
                {action.usage && getActionUsage(action.usage)}
                .&nbsp;
              </em>
            </strong>
            {action.desc}
          </p>
        ))}
      </div> */}

      {monster.legendary_actions.length > 0 && (
        <AbilityBlock 
          header="Legendary Actions"
          desc={
            `The ${monster.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${monster.name} regains spent legendary actions at the start of its turn.`
          }
          actions={monster.legendary_actions}
          className="mt-2"
        />
        // <div className="mt-2">
        //   <h2 className="my-4 text-2xl text-red-800 border-b-2 border-red-800">
        //     Legendary Actions
        //   </h2>
        //   <p className="my-2">
        //     The {monster.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature&apos;s turn. The {monster.name} regains spent legendary actions at the start of its turn.
        //   </p>
        //   {monster.legendary_actions.map((action) => (
        //     <p key={action.name} className="my-1.5">
        //       <strong>
        //         {action.name}
        //         {action.usage && getActionUsage(action.usage)}
        //         .&nbsp;
        //       </strong>
        //       {action.desc}
        //     </p>
        //   ))}
        // </div>
      )}

    </div>
  );
}

const Divider = () => <div className="my-2 border-b-2 border-red-800" />;

const Stat = ({ ability, score }: { ability: string, score: number }) => {
  return (
    <div>
      <h5 className="font-semibold text-red-800">{ability}</h5>
      <p>{`${score} (${(score<10?'':'+') + modifier(score)})`}</p>
    </div>
  );
};

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
        <h2 className="my-4 text-2xl text-red-800 border-b-2 border-red-800">
          {header}
        </h2>
      )}
      {desc && (
        <p className="my-2">
          {desc}
        </p>
      )}
      {actions.map((action) => (
        <p key={action.name} className="my-1.5">
          <span className={`font-semibold ${desc ? '' : 'italic'}`}>
            {action.name}
            {action.usage && getActionUsage(action.usage)}
            .&nbsp;
          </span>
          {action.desc}
        </p>
      ))}
    </div>
  );
};
