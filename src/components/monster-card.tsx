import React from 'react'

export default function MonsterCard({ monster }: { monster: any }) {
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
        {/* <ul className="flex gap-1">
          {monster.components.map((comp: string) => (
            <li key={comp} className="[&:not(:last-child)]:after:content-[',']">
              {comp}
            </li>
          ))}
        </ul> */}
        {/* {monster.material && <p>({monster.material})</p>} */}
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
