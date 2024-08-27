import { useSearchParams } from "react-router-dom";

export const ProfessorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  return <div>ProfessorDetails</div>;
};
