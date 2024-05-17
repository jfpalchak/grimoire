import React, { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getEquipment } from '@/lib/services';
import { shortUrl } from '@/utils/format';
import { isWeapon, isArmor, isVehicle, getCategory } from '@/utils/type-guards';
import type { Armor, Equipment, Vehicle, Weapon } from '@/types';

import Card, { Attribute } from '@/components/stat-card';

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
};

const ArmorDetail = ({ armor }: { armor: Armor }) => {
  return (
    <div className="mb-2">
      <Attribute
        name="Armor Class"
        value={
          <>
            {armor.armor_class.base}
            {armor.armor_class.dex_bonus && ' + Dex modifier'}
            {Number.isInteger(armor.armor_class.max_bonus) && ` (max ${armor.armor_class.max_bonus})`}
          </>
        }
      />
      <Attribute
        name="Strength Requirement"
        value={armor.str_minimum || 'None'}
      />
      <Attribute
        name="Stealth"
        value={armor.stealth_disadvantage ? 'Disadvantage' : 'Unaffected'}
      />
    </div>
  );
};

const VehicleDetail = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <div className="mb-2">
      {vehicle.speed && (
        <Attribute
          name="Speed"
          value={Object.values(vehicle.speed).join(' ')}
        />
      )}
      {vehicle.capacity && (
        <Attribute
          name="Capacity"
          value={vehicle.capacity}
        />
      )}
    </div>
  );
};

const WeaponDetail = ({ weapon }: { weapon: Weapon }) => {
  return (
    <div className="my-2">
      <Attribute
        name="Damage"
        value={
          <>
            {weapon.damage.damage_dice}
            {weapon.two_handed_damage && ` (${weapon.two_handed_damage.damage_dice})`}
          </>
        }
      />
      <Attribute
        name="Damage Type"
        value={weapon.damage.damage_type.name}
      />
      <Attribute
        name="Range"
        value={Object.values(weapon.range).join('/')}
      />
    </div>
  );
};

export default async function EquipmentCard({ index }: { index: string }) {

  const equipment = await getEquipment(index);

  if (!equipment) {
    notFound();
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {equipment.name}
        </Card.Title>
        <Card.Subtitle>
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
        </Card.Subtitle>
      </Card.Header>
      <Card.Content>
        {isArmor(equipment) && <ArmorDetail armor={equipment} />}
        {isVehicle(equipment) && <VehicleDetail vehicle={equipment} />}
        {isWeapon(equipment) && <WeaponDetail weapon={equipment} />}

        {(!isArmor(equipment) || !isWeapon(equipment)) && (
          <Attribute
            name="Category"
            value={<ParsedCategory equipment={equipment} />}
          />
        )}
        <Attribute
          name="Weight"
          value={`${equipment.weight} ${equipment.weight === 1 ? 'lb' : 'lbs'}`}
        />
        <Attribute
          name="Cost"
          value={`${equipment.cost.quantity} ${equipment.cost.unit}`}
        />
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
          <Attribute 
            name="Properties"
            value={
              equipment.properties.map(({ index, name, url }, _index) => (
                <Fragment key={index}>
                  <Link href={shortUrl(url)} className="hover:underline">
                    {name}
                  </Link>
                  {_index < equipment.properties.length -1 ? ', ' : ''}
                </Fragment>
              ))
            }
          />
        )}
      </Card.Content>
    </Card>
  );
}
