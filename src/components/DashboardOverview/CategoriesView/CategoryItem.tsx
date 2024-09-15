import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CategoryThemesQuery } from "@/interfaces/Dashboard";

interface CategoryItemProps {
  category: CategoryThemesQuery;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Card className="w-1/4 cursor-pointer hover:bg-blue-100 hover:shadow-md hover:border-blue-300">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-lg font-semibold tracking-tight">
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div>
            <div className="flex gap-2">
              <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                Temas:
              </h4>
              <p className="text-sm">{category.themeCount}</p>
            </div>
            <div className="flex gap-2">
              <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                Trabalhos:
              </h4>
              <p className="text-sm">{category.paperCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
