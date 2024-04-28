import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import { modifier, proficiencies, ProficiencyData, shortUrl } from '@/lib/utils';

export default async function MonsterCard({ index }: { index: any }) {

  const monster = await getMonster(index);

  if (!monster) {
    notFound();
  }

  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {monster.name}
      </h1>
      <p className="my-3 italic">
        {monster.size} {monster.type}
        {!!monster.subtype && ` (${monster.subtype})`},
        {` ${monster.alignment}`}
      </p>
      <p>
        <span className="font-semibold">
          Armor Class:&nbsp;
        </span>
        {monster.armor_class.map(({ type, value, armor }) => `${value} (${type})`)
                            .join(', ')}
      </p>
      <p>
        <span className="font-semibold">
          Hit Points:&nbsp;
        </span>
        {monster.hit_points}
        {` (${monster.hit_points_roll ?? monster.hit_dice})`}
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Speed:
        </span>
        {Object.entries(monster.speed)
                .map(([movement, feet]) => (movement === 'walk') ? feet : `${movement} ${feet}`)
                .join(', ')}
      </div>

      {/* ABILITY SCORES */}
      <div className="my-2 flex flex-wrap gap-4 text-center">
        <Stat ability='STR' score={monster.strength} />
        <Stat ability='DEX' score={monster.dexterity} />
        <Stat ability='CON' score={monster.constitution} />
        <Stat ability='INT' score={monster.intelligence} />
        <Stat ability='WIS' score={monster.wisdom} />
        <Stat ability='CHA' score={monster.charisma} />
      </div>

      {/* PROFICIENCIES */}
      <div className="flex flex-col gap-1">
        {proficiencies(monster.proficiencies).map((data) => (
          <Proficiency key={data[0]} stats={data} />
        ))}
      </div>
      
    </div>
  );
}

const Stat = ({ ability, score }: { ability: string, score: number }) => {
  return (
    <div>
      <h5 className="font-semibold text-red-600">{ability}</h5>
      <p>{`${score} (${(score<10?'':'+') + modifier(score)})`}</p>
    </div>
  );
};

const Proficiency = ({ stats }: { stats: [string, ProficiencyData[]] }) => {
  const [proficiency, abilities] = stats;
  return (
    <div className="flex gap-1">
      <span className="font-semibold">
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
