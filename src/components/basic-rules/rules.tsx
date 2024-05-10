import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Markdown from '@/components/markdown';
import { bookmark, shortUrl } from '@/lib/utils';
import { dnd } from '@/lib/api';
import { getRules } from '@/lib/services';

export default async function Rules({ index }: { index: string }) {

  const rules = await getRules(index);

  if (!rules) {
    notFound();
  }

  const sectionPromises: Promise<RuleSubsection>[] = rules.subsections.map(({ url }) => dnd.get(shortUrl(url)));
  const sections = await Promise.all(sectionPromises);

  return (
    <section>
      <div className="mb-5 border-b-2">
        <p className="font-semibold">Rules: {rules.name}</p>
      </div>
      <article>
        <div id={bookmark(rules.name)}>
          <Markdown>
            {rules.desc}
          </Markdown>
        </div>
        {sections.map((article, index) => (
          <div id={bookmark(article.name)} key={`${article.name}_${index}`} className="mt-5">
            <Markdown>
              {article.desc}
            </Markdown>
          </div>
        ))}
      </article>
    </section>
  );
}