import React, { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getEquipment } from '@/lib/services';
import { shortUrl } from '@/utils/format';
import { isWeapon, isArmor, isVehicle, getCategory } from '@/utils/type-guards';
import type { Equipment } from '@/types';

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
      <div className="my-3 italic">
        {isArmor(equipment) && (
          <span>
            <ParsedCategory equipment={equipment} />
            &nbsp;
          </span>
        )}
        <Link href={shortUrl(equipment.equipment_category.url)} className="hover:underline">
          {isWeapon(equipment)
            ? `${equipment.weapon_range} ${equipment.equipment_category.name} (${getCategory(equipment)})`
            : equipment.equipment_category.name
          }
        </Link>
      </div>

      {isArmor(equipment) && (
        <div className="my-2">
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
          <div>
            <span className="font-semibold">
              Strength Requirement:&nbsp;
            </span>
            <span>
              {equipment.str_minimum || 'None'}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              Stealth:&nbsp;
            </span>
            <span>
              {equipment.stealth_disadvantage ? 'Disadvantage' : 'Unaffected'}
            </span>
          </div>
        </div>
      )}

      {isVehicle(equipment) && (
        <div className="mb-2">
          {equipment.speed && (
            <div>
              <span className="font-semibold">
                Speed:&nbsp;
              </span>
              <span>
                {`${equipment.speed.quantity} ${equipment.speed.unit}`}
              </span>
            </div>
          )}
          {equipment.capacity && (
            <div>
              <span className="font-semibold">
                Capacity:&nbsp;
              </span>
              <span>
                {equipment.capacity}
              </span>
            </div>
          )}
        </div>
      )}

      {isWeapon(equipment) && (
        <div className="my-2">
          <div>
            <span className="font-semibold">
              Damage:&nbsp;
            </span>
            <span>
              {equipment.damage.damage_dice}
            </span>
            {equipment.two_handed_damage && (
              <span>
                {` (${equipment.two_handed_damage.damage_dice})`}
              </span>
            )}
          </div>
          <div>
            <span className="font-semibold">
              Damage Type:&nbsp;
            </span>
            <span>
              {equipment.damage.damage_type.name}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              Range:&nbsp;
            </span>
            <span>
              {equipment.range.normal}
              {equipment.range.long ? `/${equipment.range.long}` : ''}
            </span>
          </div>
        </div>
      )}

      {(!isArmor(equipment) || !isWeapon(equipment)) && (
        <div>
          <span className="font-semibold">
            Category:&nbsp;
          </span>
          <span>
            <ParsedCategory equipment={equipment} />
          </span>
        </div>
      )}
      <div>
        <span className="font-semibold">
          Weight:&nbsp;
        </span>
        {equipment.weight}
        &nbsp;
        {equipment.weight === 1 ? 'lb' : 'lbs'}
      </div>
      <div>
        <span className="font-semibold">
          Cost:&nbsp;
        </span>
        {equipment.cost.quantity} {equipment.cost.unit}
      </div>
      {equipment.desc.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {equipment.desc.map((paragraph, i) => (
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
          <ul className="list-inside list-disc">
            {equipment.contents.map(({ item, quantity }) => (
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
            Properties:&nbsp;
          </span>
          <span>
            {equipment.properties.map(({ index, name, url }, _index) => (
              <Fragment key={index}>
                <Link href={shortUrl(url)} className="hover:underline">
                  {name}
                </Link>
                {_index < equipment.properties.length -1 ? ', ' : ''}
              </Fragment>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}
