import { MagicItemData } from "@/lib/graphql/queries";
import { ReferenceItem } from "../reference-item";

export const MagicItemItem = ({ item }: { item: MagicItemData }) => (
  <ReferenceItem index={item.index}>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">Rarity: {item.rarity}</p>
    <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
  </ReferenceItem>
);