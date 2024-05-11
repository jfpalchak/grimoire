'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rules } from "@/app/rules/routes";
import { bookmark, cn } from "@/lib/utils";
import useObserver from "@/hooks/use-observer";

export default function RulesSideNav() {
  const path = usePathname();
  const chapter = rules.find((c) => c.path === path);
  
  if (!chapter) return null;
  
  const { currentView } = useObserver(chapter);

  return (
    <aside className="static">
      <div className="sticky top-10 w-64 py-4 border-2">
        <h4 className="mb-2 text-lg pl-4 font-semibold">
          <Link href={`#${bookmark(chapter.name)}`}>
            {chapter.name}
          </Link>
        </h4>
        <ul className="flex flex-col gap-1">
          {chapter.sections.map((section) => (
            <li 
              key={section}
              className={cn('py-1 text-sm',
                bookmark(section) === currentView 
                  ? 'font-semibold border-l-4 border-l-red-800 bg-slate-100' 
                  : 'border-l-4 border-l-transparent',
              )}
            >
              <Link
                href={`#${bookmark(section)}`}
                className="pl-6 hover:font-semibold"
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
