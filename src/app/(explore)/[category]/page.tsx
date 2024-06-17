import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { getCategoryConfig, getDynamicRoutes } from '@/config/category';
import ListLayout from '@/components/layouts/list-layout';
import DynamicList from './_components/dynamic-list';

type Props = {
  params: { 
    category: string;
  }
};

// export const dynamicParams = false;

export const generateStaticParams = () => {
  const routes = getDynamicRoutes();
  return routes.map((path) => ({
    category: path 
  }));
};

const getQueryByCategory = (category: string) => {
  const { query } = getCategoryConfig(category);
  return query;
};

export default async function Page({ params: { category } }: Props) {

  const QUERY_CATEGORY_ITEMS = getQueryByCategory(category);

  if (QUERY_CATEGORY_ITEMS === undefined) {
    return notFound();
  }

  return (
    <ListLayout>
      <PreloadQuery query={QUERY_CATEGORY_ITEMS}>
        <Suspense fallback={<p>LOADING...</p>}>
          <DynamicList />
        </Suspense>
      </PreloadQuery>
    </ListLayout>
  );
}
