import React from 'react'

export default function SpellCard({ spell }: { spell: any }) {
  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {spell.name}
      </h1>
      <p className="my-3 italic">
        {spell.level ? `level ${spell.level} ` : 'cantrip '}
        {`- ${spell.school.name} `}
        {spell.ritual && '(ritual)'}
      </p>
      <p>
        <span className="font-semibold">
          Casting Time:&nbsp;
        </span>
        {spell.casting_time}
      </p>
      <p>
        <span className="font-semibold">
          Range:&nbsp;
        </span>
        {spell.range}
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Components:
        </span>
        <ul className="flex gap-1">
          {spell.components.map((comp: string) => (
            <li key={comp} className="[&:not(:last-child)]:after:content-[',']">
              {comp}
            </li>
          ))}
        </ul>
        {spell.material && <p>({spell.material})</p>}
      </div>
      <p>
        <span className="font-semibold">
          Duration:&nbsp;
        </span>
        {spell.concentration && 'Concentration, '}
        {spell.duration}
      </p>
      <div className="flex gap-1">
        <span className="font-semibold">
          Classes:
        </span>
        <ul className="flex gap-1">
          {spell.classes.map(({ name }: { name: string }) => (
            <li key={name} className="[&:not(:last-child)]:after:content-[',']">
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {spell.desc.map((paragraph: string, _index: number) => (
          <p key={_index}>
            {paragraph}
          </p>
        ))}
      </div>
      {spell.higher_level.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold italic">
            At Higher Levels:
          </span>
          {spell.higher_level.map((paragraph: string, _index: number) => (
            <p key={_index}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
