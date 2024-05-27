import Link from "next/link";

const routes = [
  { name: 'Rules', path: '/rules' },
  { name: 'Classes', path: '/classes' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'Spells', path: '/spells' },
  { name: 'Monsters', path: '/monsters' },
  { name: 'Magic Items', path: '/magic-items' },
];

export default function Home() {
  return (
    <section className="mx-auto max-w-screen-xl">
      <div className="p-4 flex flex-wrap gap-5 justify-center">
        {routes.map(({ name, path }) => (
          <Link href={path} key={name}>
            <div className="size-64 text-lg font-bold content-center text-center border shadow-md rounded-md bg-white hover:shadow-lg transition-shadow">
              {name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
