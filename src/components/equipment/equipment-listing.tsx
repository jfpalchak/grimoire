import { EquipmentData } from "@/lib/graphql/queries";
import { ReferenceItem } from "../reference-item";

export const EquipmentItem = ({ item }: { item: EquipmentData }) => (
  <ReferenceItem index={item.index}>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
    <p className="text-sm font-extralight">Cost: {item.cost.quantity + item.cost.unit}</p>
    <p className="text-sm font-extralight">Weight: {item.weight}lb{item.weight > 1 ? 's' : ''}</p>
  </ReferenceItem>
);
