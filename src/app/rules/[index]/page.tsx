import Rules from "@/components/basic-rules/rules";
import RulesSideNav from "@/components/basic-rules/rules-sidenav";

interface Props {
  params: {
    index: string;
  }
}

export default async function RulePage({ params }: Props) {

  return (
    <div className="my-10 mx-4 flex gap-7">
      <RulesSideNav />
      <Rules index={params.index} />
    </div>
  ); 
}