import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getCategoryConfig } from '@/config/category';

type Props = {
  params: {
    category: string;
    index: string;
  }
};

// export const generateStaticParams = async ({ params: { category } }: Props) => {  
//   const { query } = getCategoryConfig(category);
//   const { data: { result } } = await getClient().query({ query });
//   return result.map((item) => ({
//     index: item.index,
//   }));
// };

const getDynamicCardComponent = (category: string) => {
  const {
    card: Component,
  } = getCategoryConfig(category);

  return Component;
};

export default async function IndexPage({ params: { category, index } }: Props) {

  const CardContent = getDynamicCardComponent(category);

  if (CardContent === undefined) {
    return notFound();
  }

  return (
    <section className="m-10">
      <header className="mb-5 border-b-2">
        <p className="font-semibold">Category: {category}</p>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <CardContent index={index} />
      </Suspense>
    </section>
  );
}