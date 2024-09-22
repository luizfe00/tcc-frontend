import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProfessorThemes,
  getAllStudentThemes,
  getUserThemes,
} from "../services/themeService";
import Navbar from "@/components/Navbar/Navbar";
import { Input } from "@/components/ui/input";
import {
  ThemeContainerTitle,
  ThemeSearchList,
} from "@/components/ThemeContainer";
import { OwnThemePresentation } from "@/components/ThemeContainer/OwnThemePresentation/OwnThemePresentation";
import { NewTheme } from "@/components/ThemeContainer/NewTheme/NewTheme.container";
import { InterestList } from "@/components/ThemeContainer/InterestList/InterestList";
import { getUserInterests } from "@/services/interestService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/stores/user/user.store";

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const [showNewThemeModal, setShowNewThemeModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["allThemes"],
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
                <ScrollArea className="h-full flex-1">
                  <div className="py-2 flex flex-col gap-2 max-h-[300px]">
                    <ThemeSearchList
                      themes={data}
                      orienteePaperThemeId={user?.orienteePaper?.themeId}
                    />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="col-start-4 col-end-6">
            <div className="flex flex-col h-full gap-2">
              <div className="h-1/2">
                <ThemeContainerTitle
                  label="Meus Temas"
                  onClickNewTheme={() => setShowNewThemeModal(true)}
                />
                <div className="flex flex-col gap-y-2 h-4/5 w-full">
                  {userThemes && userThemes?.length > 1 && (
                    <Input
                      type="email"
                      placeholder="Buscar tema..."
                      className="w-full"
                    />
                  )}
                  <ScrollArea className="h-full flex-1">
                    <div className="py-2 flex flex-col gap-2 max-h-[300px]">
                      {userThemes?.map((theme) => (
                        <OwnThemePresentation key={theme.id} theme={theme} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="h-1/2">
                <ThemeContainerTitle label="Meus Interesses" />
                <InterestList
                  interests={userInterests}
                  owner
                  readonly={!!user?.orienteePaper}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
