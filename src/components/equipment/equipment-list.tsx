'use client';

import Link from 'next/link';
import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_EQUIPMENT } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

type EquipmentData = {
  index: string;
  name: string;
  weight: number;
  cost: {
    unit: string;
    quantity: number;
  };
  equipment_category: {
    name: string;
  };
};

export const EquipmentItem = ({ item }: { item: EquipmentData }) => (
  <Link
    key={item.index}
    href={`/equipment/${item.index}`}
    className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="p-4">
      <p className="font-medium">{item.name}</p>
      <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
      <p className="text-sm font-extralight">Cost: {item.cost.quantity + item.cost.unit}</p>
      <p className="text-sm font-extralight">Weight: {item.weight}lb{item.weight > 1 ? 's' : ''}</p>
    </div>
  </Link>
);

const useEquipment = () => {
  const { data: { equipments } } = useSuspenseQuery(GET_ALL_EQUIPMENT);
  return equipments;
};

export default function EquipmentList() {
  
  const equipment = useEquipment();
  const filteredEquipment = useSearchFilter(equipment);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {filteredEquipment.map((item) => (
        <ReferenceItem key={item.index} index={item.index}>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
          <p className="text-sm font-extralight">Cost: {item.cost.quantity + item.cost.unit}</p>
          <p className="text-sm font-extralight">Weight: {item.weight}lb{item.weight > 1 ? 's' : ''}</p>
        </ReferenceItem>
      ))}
    </ul>
  );
}