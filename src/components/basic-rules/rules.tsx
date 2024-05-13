import React from 'react';
import { notFound } from 'next/navigation';

import Markdown from '@/components/markdown';
import { getRules } from '@/lib/services';
import { bookmark } from '@/lib/utils';

export default async function Rules({ index }: { index: string }) {

  const chapter = await getRules(index);

  if (!chapter) {
    notFound();
  }

  const { rules, sections } = chapter;

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
        {sections.map((article) => (
          <div id={bookmark(article.name)} key={article.index} className="mt-5">
            <Markdown>
              {article.desc}
            </Markdown>
          </div>
        ))}
      </article>
    </section>
  );
}