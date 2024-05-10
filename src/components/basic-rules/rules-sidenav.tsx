'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rules } from "../../app/rules/routes";
import { bookmark } from "@/lib/utils";

export default function RulesSideNav() {
  const path = usePathname();
  const chapter = rules.find((c) => c.path === path);

  if (!chapter) return null;

  return (
    <aside className="static">
      <div className="sticky top-10 w-64 p-4 border-2">
        <h4 className="mb-2 text-lg font-semibold">
          <Link href={`#${bookmark(chapter.name)}`}>
            {chapter.name}
          </Link>
        </h4>
        <ul className="pl-2 text-sm flex flex-col gap-2">
          {chapter.sections.map((section) => (
            <li key={section}>
              <Link
                href={`#${bookmark(section)}`}
                className="hover:underline"
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
