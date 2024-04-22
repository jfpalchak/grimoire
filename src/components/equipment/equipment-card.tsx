import { getEquipment, dnd } from '@/lib/services';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

interface ContentItem {
  item: {
    index: string;
    name: string;
    url: string;
  };
  quantity: number;
}

const typeofCategory = (category: string) => {
  const splitCat = category.split('-');
  const type = splitCat.length > 1 ? splitCat[splitCat.length-1] : splitCat[0];

  switch (type) {
    case 'tools':
      return 'tool_category';
    case 'vehicles':
      return 'vehicle_category';
    default: 
      return `${type}_category`;
  }
};

const ParsedCategory = ({ equipment }: any) => {

  const type = typeofCategory(equipment.equipment_category.index);

  const category = equipment[type];

  if (typeof category === 'object') {
    return (
      <Link href={`/equipment-categories/${category.index}`} className="hover:underline">
        {category.name}
      </Link>
    );
  }

  return category;
}

export default async function EquipmentCard({ index }: { index: string }) {

  // const equipment = await getEquipment(index);
  const equipment = await dnd.equipment.get(index);

  if (!equipment) {
    notFound();
  }

  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {equipment.name}
      </h1>
      <p className="my-3 italic">
        <Link href={`/equipment-categories/${equipment.equipment_category.index}`} className="hover:underline">
          {equipment.equipment_category.name}
        </Link>
      </p>
      <p>
        <span className="font-semibold">
          Category:&nbsp;
        </span>
        <ParsedCategory equipment={equipment} />
      </p>
      <p>
        <span className="font-semibold">
          Weight:&nbsp;
        </span>
        {equipment.weight}
      </p>
      <p>
        <span className="font-semibold">
          Cost:&nbsp;
        </span>
        {equipment.cost.quantity} {equipment.cost.unit}
      </p>
      {equipment.desc.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {equipment.desc.map((paragraph: string, i: number) => (
            <p key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {equipment.contents.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold">
            Contents:
          </span>
          <ul>
            {equipment.contents.map(({ item, quantity }: ContentItem) => (
                <li key={item.index}>
                  {quantity}&nbsp;
                  <Link href={`/equipment/${item.index}`} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
      {equipment.properties.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold">
            Properties:
          </span>
          <ul>
            {equipment.properties.map(({ index, name }: { index: string, name: string }) => (
              <li key={index}>
                <Link href={`/weapon-properties/${index}`} className="hover:underline">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
