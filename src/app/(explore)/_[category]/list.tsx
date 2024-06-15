'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SpellItem } from '@/components/spells/spell-list';
import { MonsterItem } from '@/components/monsters/monster-list';
import { EquipmentItem } from '@/components/equipment/equipment-list';
import { MagicItemItem } from '@/components/equipment/magic-item-list';
import { useSearchFilter } from '@/hooks/user-search-filter';

type Props = {
  data: any;
};

type Category = 'spells' | 'monsters' | 'equipment' | 'magic-items';

const listItems = {
  'spells': SpellItem,
  'monsters': MonsterItem,
  'equipment': EquipmentItem,
  'magic-items': MagicItemItem,
} as const;

function paginate <T>(array: T[], pageSize: number, currentPage: number) {
  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  return array.slice(start, end);
}

const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  return (
    <div className="flex gap-5">
      <Link
        href={{ query: { page: (currentPage === 1 ? currentPage : currentPage - 1) } }}
        scroll={false}
      >
        Previous
      </Link>
        {Array.from({ length: totalPages }, (_, i) => i).map((num) => (
          <Link
            href={{ query: { page: num + 1 }}}
            className={`${currentPage === num + 1 ? 'underline underline-offset-1 font-semibold' : ''}`}
            scroll={false}
          >
            {num+1}
          </Link>
        ))}
      <Link
        href={{ query: { page: (currentPage === totalPages ? currentPage : currentPage + 1) } }}
        scroll={false}
      >
        Next
      </Link>
    </div>
  );
};

export default function List({ data }: Props) {

  const items = useSearchFilter(data);
  
  const path = usePathname();
  const key = path.slice(1) as Category;
  const ItemComponent = listItems[key];

  // const searchParams = useSearchParams();
  // const page = parseInt(searchParams.get('page') ?? '1');
  // const pageSize = 50;

  // const totalPages = Math.ceil(spells.length / pageSize);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {/* <Pagination currentPage={page} totalPages={totalPages} /> */}
      {items.map((item: any) => (
          <ItemComponent item={item} />
        ))}
    </ul>
  );
}