'use client';

import { useSuspenseQuery } from '@apollo/client';
import { type EquipmentData, GET_ALL_EQUIPMENT } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

export const EquipmentItem = ({ item }: { item: EquipmentData }) => (
  <>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
    <p className="text-sm font-extralight">Cost: {item.cost.quantity + item.cost.unit}</p>
    <p className="text-sm font-extralight">Weight: {item.weight}lb{item.weight > 1 ? 's' : ''}</p>
  </>
);

const useEquipment = () => {
  const { data: { result } } = useSuspenseQuery(GET_ALL_EQUIPMENT);
  return result;
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