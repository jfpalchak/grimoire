import React, { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getEquipment } from '@/lib/rest/services';
import { formatArmorAC, comma } from '@/utils/format';
import { isWeapon, isArmor, isVehicle, getCategory } from '@/utils/type-guards';
import type { Armor, Equipment, Vehicle, Weapon } from '@/types';

import Card, { Attribute } from '@/components/stat-card';
import ReferenceLink from '../reference-link';

const ParsedCategory = ({ equipment }: { equipment: Equipment }) => {
  const category = getCategory(equipment);

  if (typeof category === 'object') {
    return (
      <ReferenceLink href={category.url}>
        {category.name}
      </ReferenceLink>
    );
  }
  return category;
};

const ArmorDetail = ({ armor }: { armor: Armor }) => {
  return (
    <div className="mb-2">
      <Attribute
        label="Armor Class"
        value={formatArmorAC(armor.armor_class)}
      />
      <Attribute
        label="Strength Requirement"
        value={armor.str_minimum || 'None'}
      />
      <Attribute
        label="Stealth"
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
          label="Speed"
          value={Object.values(vehicle.speed).join(' ')}
        />
      )}
      {vehicle.capacity && (
        <Attribute
          label="Capacity"
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
        label="Damage"
        value={
          <>
            {weapon.damage.damage_dice}
            {weapon.two_handed_damage && ` (${weapon.two_handed_damage.damage_dice})`}
          </>
        }
      />
      <Attribute
        label="Damage Type"
        value={weapon.damage.damage_type.name}
      />
      <Attribute
        label="Range"
        value={Object.values(weapon.range).join('/')}
      />
    </div>
  );
};

export async function EquipmentCard({ index }: { index: string }) {

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
          <ReferenceLink href={equipment.equipment_category.url}>
            {isWeapon(equipment)
              ? `${equipment.weapon_range} ${equipment.equipment_category.name} (${getCategory(equipment)})`
              : equipment.equipment_category.name
            }
          </ReferenceLink>
        </Card.Subtitle>
      </Card.Header>
      <Card.Content>
        {isArmor(equipment) && <ArmorDetail armor={equipment} />}
        {isVehicle(equipment) && <VehicleDetail vehicle={equipment} />}
        {isWeapon(equipment) && <WeaponDetail weapon={equipment} />}

        {!(isArmor(equipment) || isWeapon(equipment)) && (
          <Attribute
            label="Category"
            value={<ParsedCategory equipment={equipment} />}
          />
        )}
        <Attribute
          label="Weight"
          value={`${equipment.weight} ${equipment.weight === 1 ? 'lb' : 'lbs'}`}
        />
        <Attribute
          label="Cost"
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
            <ul className="pl-1 list-inside list-disc">
              {equipment.contents.map(({ item, quantity }) => (
                <li key={item.index}>
                  {quantity}&nbsp;
                  <ReferenceLink href={item.url}>
                    {item.name}
                  </ReferenceLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        {equipment.properties.length > 0 && (
          <Attribute 
            label="Properties"
            value={
              equipment.properties.map(({ index, name, url }, i) => (
                <Fragment key={index}>
                  <ReferenceLink href={url}>
                    {name}
                  </ReferenceLink>
                  {comma(equipment.properties, i)}
                </Fragment>
              ))
            }
          />
        )}
      </Card.Content>
    </Card>
  );
}
