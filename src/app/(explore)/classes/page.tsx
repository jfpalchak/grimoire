import Link from 'next/link';
import { classes } from '@/config/classes';

export default async function Page() {

  return (
    <section className="m-10">
      <div className="border-b-2 font-semibold">
        <p>Category: Classes</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-center">
        {classes.map(({ name, path }) => (
          <Link
            key={name}
            href={path}
            className="w-80 p-4 shadow-md rounded-md"
          >
            <h4 className="mb-2 text-lg font-semibold">
              {name}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  )
}
