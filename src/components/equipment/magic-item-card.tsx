import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getMagicItem } from '@/lib/services';
import { formatDescMD, comma } from '@/utils/format';
import Card, { Attribute } from '@/components/stat-card';
import Markdown from '@/components/markdown';
import ReferenceLink from '@/components/reference-link';

export default async function MagicItemCard({ index }: { index: string }) {
  const item = await getMagicItem(index);

  if (!item) {
    notFound();
  }

  const [itemMeta, ...itemDesc] = item.desc;

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {item.name}
        </Card.Title>
        <Card.Subtitle>
          {itemMeta}
        </Card.Subtitle>
      </Card.Header>
      <Card.Content>
        <Markdown>
          {formatDescMD(itemDesc)}
        </Markdown>
        {item.variants.length > 0 && (
          <Attribute
            label="Variants"
            className="mt-5"
            value={
              item.variants.map(({ index, name, url }, i) => (
                <Fragment key={index}>
                  <ReferenceLink href={url}>
                    {name}
                  </ReferenceLink>
                  {comma(item.variants, i)}
                </Fragment>
              ))
            }
          />
        )}
      </Card.Content>
    </Card>
  );
}