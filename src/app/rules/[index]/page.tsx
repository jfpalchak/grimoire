import Rules from "@/components/basic-rules/rules";

interface Props {
  params: {
    index: string;
  }
}

// export default Rules;

export default async function RulePage({ params }: Props) {

  return <Rules index={params.index} />; 
}