import { MonsterData } from "@/lib/graphql/queries";
import { ReferenceItem } from "../reference-item";

export const MonsterItem = ({ item }: { item: MonsterData }) => (
  <ReferenceItem index={item.index}>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">{item.type}</p>
    <p className="text-sm font-extralight">CR: {item.challenge_rating}</p>
  </ReferenceItem>
);