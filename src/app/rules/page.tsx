import React from 'react'
import Link from 'next/link';
import { rules } from './routes';
import { slugify } from '@/utils/format';

export default async function Page() {

  return (
    <section className="mx-auto max-w-screen-xl">
      <header className="my-10 mx-10 border-b-2 font-semibold">
        <p>Category: Basic Rules</p>
      </header>
      <div className="p-4 flex flex-wrap gap-5 justify-center">
        {rules.map(({ name, path, sections }) => (
          <div key={name} className="w-80 p-4 bg-white border shadow-md rounded-md">
            <h4 className="mb-2 text-lg font-semibold">
              <Link href={path}>
                {name}
              </Link>
            </h4>
            <ul className="pl-4 text-sm flex flex-col gap-1">
              {sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`${path}#${slugify(section)}`}
                    className="hover:underline"
                  >
                    {section}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
