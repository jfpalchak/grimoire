import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import { modifier, proficiencies, shortUrl } from '@/lib/utils';

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
        {Object.entries(monster.speed).map(([movement, feet]) => 
          (movement === 'walk') ? feet : `${movement} ${feet}`).join(', ')}
      </div>

      {/* ABILITY SCORES */}
      <div className="my-2 flex flex-wrap gap-4 text-center">
        <div>
          <h5 className="font-semibold">STR</h5>
          <p>{monster.strength} (+{modifier(monster.strength)})</p>
        </div>
        <div>
          <h5 className="font-semibold">DEX</h5>
          <p>{monster.dexterity} (+{modifier(monster.dexterity)})</p>
        </div>
        <div>
          <h5 className="font-semibold">CON</h5>
          <p>{monster.constitution} (+{modifier(monster.constitution)})</p>
        </div>
        <div>
          <h5 className="font-semibold">INT</h5>
          <p>{monster.intelligence} (+{modifier(monster.intelligence)})</p>
        </div>
        <div>
          <h5 className="font-semibold">WIS</h5>
          <p>{monster.wisdom} (+{modifier(monster.wisdom)})</p>
        </div>
        <div>
          <h5 className="font-semibold">CHA</h5>
          <p>{monster.charisma} (+{modifier(monster.charisma)})</p>
        </div>
      </div>

      {/* PROFICIENCIES */}
      <div className="flex flex-col gap-1">
        {proficiencies(monster.proficiencies).map(([proficiency, stats]) => (
          <div key={proficiency} className="flex gap-1">
            <span className="font-semibold">
              {proficiency}:
            </span>
            <ul className="flex gap-1 list-comma">
              {stats.map(({ stat, value, url }) => (
                <li key={url}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {stat}
                  </Link>
                  {` +${value}`}
                </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      
    </div>
  )
}
