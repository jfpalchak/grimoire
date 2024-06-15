'use client';

import { createContext, PropsWithChildren, useContext } from "react";
import Link from "next/link";

import Markdown from "@/components/markdown";
import { cn } from "@/utils/cn";
import { useObserver } from "@/hooks/use-observer";
import type { RulesChapter, RulesSubsection } from "@/types";

const ChapterContext = createContext<any>({});
const useChapterObserver = () => useContext(ChapterContext);

export const Chapter = ({ children }: PropsWithChildren) => {
  const { refs, inView } = useObserver();

  return (
    <ChapterContext.Provider value={{ inView, refs }}>
      <section className="p-4 flex gap-7">
        {children}
      </section>
    </ChapterContext.Provider>
  )
}

type SideNavProps = {
  chapter: RulesChapter;
}

export function ChapterSideNav({ chapter }: SideNavProps) {

  const { rules, subsections } = chapter;

  const { inView } = useChapterObserver();
  
  return (
    <aside className="static hidden md:block">
      <nav className="sticky top-10 w-72 py-4 border-2">
        <h4 className="mb-2 text-lg pl-4 font-semibold">
          <Link href={`#${rules.index}`}>
            {rules.name}
          </Link>
        </h4>
        <ul className="flex flex-col gap-1">
          {subsections.map((section) => (
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
  );
}

export const ChapterSections = ({ sections }: { sections: RulesSubsection[] }) => {
  const { refs } = useChapterObserver();

  return (
    <>
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
    </>
  );
}
