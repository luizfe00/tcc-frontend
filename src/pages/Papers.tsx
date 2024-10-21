import Navbar from "@/components/Navbar/Navbar";
import { ProfessorPaperView } from "@/components/PaperView/ProfessorPaperView/ProfessorPaperView";
import { StudentPaperView } from "@/components/PaperView/StudentPaperView/StudentPaperView";
import { getUserPapers } from "@/services/paperService";
import { useUserStore } from "@/stores/user/user.store";
import { useQuery } from "@tanstack/react-query";

export const PapersPage = () => {
  const userState = useUserStore((state) => state);
  const queryStudentPaper = async () => {
    const data = await getUserPapers();
    if (userState?.user && data) {
      userState.setUser({
        ...userState.user,
        orienteePaper: data[0],
      });
    }

    return data;
  };

  const { data } = useQuery({
    queryKey: ["userPapers"],
    queryFn: queryStudentPaper,
  });

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="h-full p-4">
        {userState?.user?.role === "STUDENT" ? (
          <StudentPaperView
            papers={
              userState?.user?.orienteePaper
                ? [userState?.user.orienteePaper]
                : []
            }
          />
        ) : (
          <ProfessorPaperView papers={data} />
        )}
      </div>
    </div>
  );
};
