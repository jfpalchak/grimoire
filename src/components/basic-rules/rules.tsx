import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Markdown from '@/components/markdown';
import { shortUrl } from '@/lib/utils';
import { dnd } from '@/lib/api';

export default async function Rules({  index }: { index: string }) {

  const rules = await dnd.get(`rules/${index}`);

  if (!rules) {
    notFound();
  }

  const sectionPromises = rules.subsections.map((section: any) => dnd.get(shortUrl(section.url)));
  const sections = await Promise.all(sectionPromises);

  return (
    <section className="m-10">
      <div className="mb-5 border-b-2">
        <p className="font-semibold">Rules: {rules.name}</p>
      </div>
      <article>
        <div id={rules.name}>
          <Markdown>
            {rules.desc}
          </Markdown>
        </div>
        {sections.map((article, index) => (
          <div id={article.name.replace(/\s/g, '')} key={`${article.name}_${index}`} className="mt-5">
            <Markdown>
              {article.desc}
            </Markdown>
          </div>
        ))}
      </article>
    </section>
  );
}