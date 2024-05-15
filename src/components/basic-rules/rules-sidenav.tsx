'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { bookmark } from "@/utils/format";
import { cn } from "@/utils/cn";
import { rules } from "@/app/rules/routes";
import useObserver from "@/hooks/use-observer";

export default function RulesSideNav() {
  const path = usePathname();
  const thisChapter = rules.find((c) => c.path === path);
  
  if (!thisChapter) return null;
  
  const { currentView } = useObserver(thisChapter);

  return (
    <aside className="static hidden md:block">
      <div className="sticky top-10 w-64 py-4 border-2">
        <h4 className="mb-2 text-lg pl-4 font-semibold">
          <Link href={`#${bookmark(thisChapter.name)}`}>
            {thisChapter.name}
          </Link>
        </h4>
        <ul className="flex flex-col gap-1">
          {thisChapter.sections.map((section) => (
            <li 
              key={section}
              className={cn('py-1 text-sm',
                bookmark(section) === currentView 
                  ? 'border-l-4 border-l-red-800 font-semibold' 
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
