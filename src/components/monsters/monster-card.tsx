import { notFound } from 'next/navigation';
import { getMonster } from '@/lib/services';
import { modifier } from '@/lib/utils';

export default async function MonsterCard({ index }: { index: any }) {

  // const monster = await getMonster(index);
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
      </p>
      <p>
        <span className="font-semibold">
          Hit Points:&nbsp;
        </span>
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Speed:
        </span>
      </div>

      {/* ABILITY SCORES */}
      <div className="my-2 flex gap-4 text-center">
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
      <p>
        <span className="font-semibold">
          Stats:&nbsp;
        </span>
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Saving Throws:
        </span>
        {/* <ul className="flex gap-1">
          {monster.classes.map(({ name }: { name: string }) => (
            <li key={name} className="[&:not(:last-child)]:after:content-[',']">
              {name}
            </li>
          ))}
        </ul> */}
      </div>
      <div className="">
        <span className="font-semibold">
          Skills:
        </span>
      </div>
      {/* {monster.higher_level.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold italic">
            At Higher Levels:
          </span>
          {monster.higher_level.map((paragraph: string, _index: number) => (
            <p key={_index}>
              {paragraph}
            </p>
          ))}
        </div>
      )} */}
    </div>
  )
}
