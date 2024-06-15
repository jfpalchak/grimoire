import { notFound } from 'next/navigation';
import { TypedDocumentNode } from '@apollo/client';
import { getClient } from '@/lib/graphql/apollo-client';
import {
  GET_ALL_MAGIC_ITEMS,
  GET_ALL_EQUIPMENT,
  GET_ALL_MONSTERS,
  GET_ALL_SPELLS,
  } from '@/lib/graphql/queries';
import Search from '@/components/ui/search';
import List from './list';

type Params = {
  category: string;
};

type Props = {
  params: Params
};

type Category = 'spells' | 'monsters' | 'equipment' | 'magic-items';

const queries = {
  spells: GET_ALL_SPELLS,
  monsters: GET_ALL_MONSTERS,
  equipment: GET_ALL_EQUIPMENT,
  'magic-items': GET_ALL_MAGIC_ITEMS,
} satisfies Record<Category, TypedDocumentNode>;

const getCategory = async <T extends Category>({ category }: { category: T }): Promise<typeof queries[T] | null> => {
  const query = queries[category];
  if (!query) return null;
  const { data } = await getClient().query({ query });
  return Object.values(data)[0];
};

export default async function Page({ params }: Props) {

  const data = await getCategory({ category: params.category as Category });

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: {params.category}</p>
        <br/> 
        <Search />
      </header>
      <div>
        <List data={data} />
      </div>
    </section>
  );
}
