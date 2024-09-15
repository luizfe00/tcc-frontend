import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryItem } from "./CategoryItem";
import { CategoryBI } from "@/interfaces/Dashboard";

interface CategoriesContainerProps {
  data?: CategoryBI;
}

export const CategoriesContainer = ({ data }: CategoriesContainerProps) => {
  if (!data) return null;
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Resumo dos trabalhos por categoria</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            Categorias com mais temas
          </h4>
          <div className="flex gap-4">
            {data.categoriesWithMostThemes.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            Categorias com mais trabalhos
          </h4>
          <div className="flex gap-4">
            {data.categoriesWithMostPapers.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            Categorias com menos temas
          </h4>
          <div className="flex gap-4">
            {data.categoriesWithLeastThemes.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            Categorias com menos trabalhos
          </h4>
          <div className="flex gap-4">
            {data.categoriesWithLeastPapers.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
