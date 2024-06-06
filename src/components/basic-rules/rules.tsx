'use client';

import Link from 'next/link';
import Markdown from '@/components/markdown';
import { useObserver } from '@/hooks/use-observer';
import { cn } from '@/utils/cn';
import { type RulesChapter } from '@/types';

export default function Rules({ chapter }: { chapter: RulesChapter }) {
  
  const { refs, inView } = useObserver();
  const { rules, sections } = chapter;

  return (
    <section className="p-4 flex gap-7">
      <aside className="static hidden md:block">
        <nav className="sticky top-10 w-64 py-4 border-2 bg-white">
          <h4 className="mb-2 text-lg pl-4 font-semibold">
            <Link href={`#${rules.index}`}>
              {rules.name}
            </Link>
          </h4>
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li 
                key={section.index}
                className={cn('py-1 text-sm',
                  section.index === inView 
                    ? 'border-l-4 border-l-red-800 font-semibold' 
                    : 'border-l-4 border-l-transparent',
                )}
              >
                <Link
                  href={`#${section.index}`}
                  className="pl-6 hover:font-semibold"
                >
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <article>
        <section id={rules.index}>
          <Markdown>
            {rules.desc}
          </Markdown>
        </section>
        {sections.map((article, i) => (
          <section
            key={article.index}
            id={article.index}
            ref={(el) => { 
              if (el) refs.current[i] = el; 
            }}
            className="mt-5"
          >
            <Markdown>
              {article.desc}
            </Markdown>
          </section>
        ))}
      </article>
    </section>
  );
}
