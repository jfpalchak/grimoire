import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { getCategoryConfig, getCategoryRoutes } from '@/config/category';
import DynamicList from './_components/dynamic-list';
import Search from '@/components/ui/search';

type Props = {
  params: { 
    category: string;
  }
};

// export const dynamicParams = false;

export const generateStaticParams = () => {
  const routes = getCategoryRoutes();
  return routes.map((path) => ({
    category: path 
  }));
};

const getQueryByCategory = (category: string) => {
  try {
    const { query } = getCategoryConfig(category);
    return query;
  } catch (err) {
    console.error(err);
    return;
  }
};

export default async function Page({ params: { category } }: Props) {

  const QUERY_CATEGORY_ITEMS = getQueryByCategory(category);

  if (QUERY_CATEGORY_ITEMS === undefined) {
    return notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Explore {category}</p>
        <br/>
        <Suspense>
          <Search />
        </Suspense>
      </header>
      <div>
      <PreloadQuery query={QUERY_CATEGORY_ITEMS}>
        <Suspense fallback={<p>LOADING...</p>}>
          <DynamicList />
        </Suspense>
      </PreloadQuery>
      </div>
    </section>
  );
}
