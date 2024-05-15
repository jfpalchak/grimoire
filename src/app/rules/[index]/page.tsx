import Rules from "@/components/basic-rules/rules";
import RulesSideNav from "@/components/basic-rules/rules-sidenav";

interface Props {
  params: {
    index: string;
  }
}

export default async function RulePage({ params }: Props) {

  return (
    <div className="mt-10 mb-20 mx-4 flex gap-7">
      {/* pass routes as prop, turn into reusable sidenav */}
      <RulesSideNav />
      <Rules index={params.index} />
    </div>
  ); 
}