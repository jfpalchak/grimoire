import { notFound } from "next/navigation";
import { getRules } from "@/lib/rest/services";
import Rules from "@/components/basic-rules/rules";
import { dndGraph } from "@/lib/graphql/apollo-client";
import { GET_RULE } from "@/lib/graphql/queries";

type Props = {
  params: {
    index: string;
  }
};

const getRule = async (index: string) => {
  const { rule } = await dndGraph.query(GET_RULE, { index });
  const { subsections, ...rules } = rule ?? {};
  return rule ? { subsections, rules } : rule;
};

export default async function RulePage({ params: { index } }: Props) {

  const chapter = await getRule(index);

  if (!chapter) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-screen-xl">
      <header className="mt-10 px-4">
        <p className="font-semibold">Rules &gt; {chapter.rules.name}</p>
      </header>
      <Rules chapter={chapter} />
    </section>
  ); 
}