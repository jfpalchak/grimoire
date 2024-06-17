import { SpellData } from "@/lib/graphql/queries";
import { ReferenceItem } from "../reference-item";

const formatLevel = (level: number) => {
  switch (level) {
    case 0:
      return 'cantrip';
    case 1:
      return '1st level';
    case 2:
      return '2nd level';
    case 3:
      return '3rd level';
    default:
      return `${level}th level`;
  }
};

export const SpellItem = ({ item }: { item: SpellData }) => (
  <ReferenceItem index={item.index}>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">{item.school.name}</p>
    <p className="text-sm font-extralight">{formatLevel(item.level)}</p>
  </ReferenceItem>
);