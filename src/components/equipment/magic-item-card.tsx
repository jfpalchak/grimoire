import { getMagicItem } from "@/lib/services";
import { notFound } from "next/navigation";
import Card from "@/components/stat-card";

export default async function MagicItemCard({ index }: { index: string }) {
  const item = await getMagicItem(index);

  if (!item) {
    notFound();
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {item.name}
        </Card.Title>
      </Card.Header>
    </Card>
  );
}