import React, { PropsWithChildren } from 'react'
import { classes } from '../../classes/routes';

const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const schools = ['Abjuration', 'Enchantment', 'Transmutation', 'Illusion', 'Evocation', 'Divination', 'Necromancy', 'Conjuration'];

const FilterButton = ({ children }: PropsWithChildren) => (
  <button className="p-5 min-w-fit text-sm font-semibold bg-white text-red-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
    {children}
  </button>
);

export default function SpellFilters() {
  return (
    <div>
      <p className="mb-2 font-bold text-center">Search Filters</p>
      <div className="mx-24">
        <div>
          <p className="font-semibold mb-2">Spell Level</p>
          <div className="grid grid-cols-5 gap-2">
            {levels.map((level) => (
              <FilterButton
                key={level}
              >
                {level === 0 ? 'Cantrip' : level}
              </FilterButton>
            ))} 
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Spell School</p>
          <div className="grid grid-cols-4 gap-2">
            {schools.map((school) => (
              <FilterButton
                key={school}
              >
                {school}
              </FilterButton>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Class</p>
          <div className="grid grid-cols-4 gap-2">
            {classes.map(({ name }) => (
              <FilterButton
                key={name}
              >
                {name}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}