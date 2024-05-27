import { notFound } from "next/navigation";
import { getRules } from "@/lib/services";
import Rules from "@/components/basic-rules/rules";

interface Props {
  params: {
    index: string;
  }
}

export default async function RulePage({ params }: Props) {

  const chapter = await getRules(params.index);

  if (!chapter) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-screen-xl">
      <header className="mt-10 px-4">
        <p className="font-semibold">Category: {params.index}</p>
      </header>
      <Rules chapter={chapter} />
    </section>
  ); 
}