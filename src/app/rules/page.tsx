import React from 'react'
import Link from 'next/link';
import { chapters } from './routes';

export default async function Page() {

  return (
    <section className="m-10">
      <div className="border-b-2 font-semibold">
        <p>Category: Basic Rules</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-center">
        {chapters.map((rules) => (
          <div key={rules.chapter} className="w-80 p-4 shadow-md">
            <h4 className="mb-2 text-lg font-semibold">
              <Link href={rules.path}>
                {rules.chapter}
              </Link>
            </h4>
            <ul className="pl-4 text-sm flex flex-col gap-1">
              {rules.sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`${rules.path}#${section.replace(/\s/g, '')}`}
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
