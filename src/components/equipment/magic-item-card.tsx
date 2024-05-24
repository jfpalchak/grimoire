import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getMagicItem } from '@/lib/services';
import { formatDescMD, shortUrl } from '@/utils/format';
import Card, { Attribute } from '@/components/stat-card';
import Markdown from '@/components/markdown';

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
                  <Link href={shortUrl(url)} className="hover:underline">
                    {name}
                  </Link>
                  {i < item.variants.length -1 ? ', ' : ''}
                </Fragment>
              ))
            }
          />
        )}
      </Card.Content>
    </Card>
  );
}