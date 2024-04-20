import Link from 'next/link';
import React from 'react'

export default function Navbar() {
  return (
    <nav className="border-b-2">
      <ul className="p-4 flex gap-5">
        <Link href="/">Home</Link>
        <Link href="/equipment">Equipment</Link>
        <Link href="/spells">Spells</Link>
        <Link href="/monsters">Monsters</Link>
      </ul>
    </nav>
  );
}
