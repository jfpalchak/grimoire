import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEquipment } from '@/lib/services';
import { shortUrl } from '@/lib/utils';

enum CategoryType {
  Weapon  = 'weapon_category',
  Armor   = 'armor_category',
  Vehicle = 'vehicle_category',
  Tool    = 'tool_category',
  Gear    = 'gear_category'
}

const isWeapon = (equipment: Equipment): equipment is Weapon => {
  return CategoryType.Weapon in equipment;
};
const isArmor = (equipment: Equipment): equipment is Armor => {
  return CategoryType.Armor in equipment;
};
const isVehicle = (equipment: Equipment): equipment is Vehicle => {
  return CategoryType.Vehicle in equipment;
};
const isTool = (equipment: Equipment): equipment is Tool => {
  return CategoryType.Tool in equipment;
};
const isGear = (equipment: Equipment): equipment is Gear => {
  return CategoryType.Gear in equipment;
};

const getCategory = (equipment: Equipment) => {
  if (isArmor(equipment)) {
    return equipment.armor_category;
  } else if (isWeapon(equipment)) {
    return equipment.weapon_category;
  } else if (isVehicle(equipment)) {
    return equipment.vehicle_category;
  } else if (isTool(equipment)) {
    return equipment.tool_category;
  } else if (isGear(equipment)) {
    return equipment.gear_category;
  } else {
    return 'Unknown Category';
  }
}

const ParsedCategory = ({ equipment }: { equipment: Equipment }) => {
  const category = getCategory(equipment);

  if (typeof category === 'object') {
    return (
      <Link href={shortUrl(category.url)} className="hover:underline">
        {category.name}
      </Link>
    );
  }
  return category;
}

export default async function EquipmentCard({ index }: { index: string }) {

  const equipment = await getEquipment(index);

  if (!equipment) {
    notFound();
  }

  return (
    <div>
      <h1 className="mt-10 text-xl font-bold">
        {equipment.name}
      </h1>
      <p className="my-3 italic">
        <Link href={shortUrl(equipment.equipment_category.url)} className="hover:underline">
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

      {isVehicle(equipment) && (
        <>
          <div>
            <span className="font-semibold">
              Speed:&nbsp;
            </span>
            <span>
              {`${equipment.speed.quantity} ${equipment.speed.unit}`}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              Capacity:&nbsp;
            </span>
            <span>
              {equipment.capacity}
            </span>
          </div>
        </>
      )}

      {isArmor(equipment) && (
        <>
          <div>
            <span className="font-semibold">
              Armor Class:&nbsp;
            </span>
            <span>
              {equipment.armor_class.base}
              {equipment.armor_class.dex_bonus && ' + Dex modifier'}
              {Number.isInteger(equipment.armor_class.max_bonus) && ` (max ${equipment.armor_class.max_bonus})`}
            </span>
          </div>
          {equipment.str_minimum > 0 && (
            <div>
              <span className="font-semibold">
                Strength Required:&nbsp;
              </span>
              <span>
                {equipment.str_minimum }
              </span>
            </div>
          )}
          <div>
            <span className="font-semibold">
              Stealth:&nbsp;
            </span>
            <span>
              {equipment.stealth_disadvantage ? 'Disadvantage' : 'Unaffected'}
            </span>
          </div>
        </>
      )}

      {/* WEAPON */}
      {/* Range */}
      {/* Damage */}
      {isWeapon(equipment) && (
        <div>
          
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
                  <Link href={shortUrl(item.url)} className="hover:underline">
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
            {equipment.properties.map(({ index, name, url }: { index: string, name: string, url: string }) => (
              <li key={index}>
                <Link href={shortUrl(url)} className="hover:underline">
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
