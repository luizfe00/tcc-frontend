import { useQuery } from "@tanstack/react-query";
import {
  getAllProfessorThemes,
  getAllStudentThemes,
  getUserThemes,
} from "../services/themeService";
import Navbar from "@/components/Navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ThemeContainerTitle,
  ThemeSearchList,
} from "@/components/ThemeContainer";
import { useUserStore } from "@/user/user.store";
import { OwnThemePresentation } from "@/components/ThemeContainer/OwnThemePresentation/OwnThemePresentation";
import { useState } from "react";
import { NewTheme } from "@/components/ThemeContainer/NewTheme/NewTheme";
import { InterestList } from "@/components/ThemeContainer/InterestList/InterestList";
import { getUserInterests } from "@/services/interestService";

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const [showNewThemeModal, setShowNewThemeModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["studentThemes"],
    queryFn:
      user?.role === "STUDENT" ? getAllProfessorThemes : getAllStudentThemes,
  });

  const { data: userThemes } = useQuery({
    queryKey: ["userThemes"],
    queryFn: getUserThemes,
  });

  const { data: userInterests } = useQuery({
    queryKey: ["userInterests"],
    queryFn: getUserInterests,
  });

  const themeOptionActions = () => {
    const options = [];
    const addNewThemeAction = (
      <Button
        key="add-theme"
        variant={"outline"}
        size={"icon"}
        className="rounded-full h-8 w-8"
        onClick={() => setShowNewThemeModal(true)}
      >
        +
      </Button>
    );
    if (!(user?.role === "STUDENT" && userThemes && userThemes?.length > 0))
      options.push(addNewThemeAction);
    return options;
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <NewTheme open={showNewThemeModal} onOpenChange={setShowNewThemeModal} />
      <div className="p-4 flex-1">
        <div className="grid grid-cols-5 gap-6 h-full">
          <div className="col-start-1 col-end-4 ">
            <div className="flex flex-col h-full">
              <ThemeContainerTitle label="Buscar Temas" />
              <div className="mt-2 flex flex-col gap-y-4 grow">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="email"
                    placeholder="Buscar tema..."
                    className="w-full"
                  />
                </div>
                <ThemeSearchList
                  onPress={(theme) => console.log({ theme })}
                  themes={data}
                />
              </div>
            </div>
          </div>
          <div className="col-start-4 col-end-6">
            <div className="flex flex-col h-full gap-2">
              <div>
                <ThemeContainerTitle
                  label="Meus Temas"
                  actions={themeOptionActions}
                />
                <div className="flex flex-col gap-y-4">
                  {userThemes && userThemes?.length > 1 && (
                    <Input
                      type="email"
                      placeholder="Buscar tema..."
                      className="w-full"
                    />
                  )}
                  {userThemes?.map((theme) => (
                    <OwnThemePresentation key={theme.label} theme={theme} />
                  ))}
                </div>
              </div>
              <div>
                <ThemeContainerTitle label="Meus Interesses" />
                <InterestList interests={userInterests} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
