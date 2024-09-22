import Navbar from "@/components/Navbar/Navbar";
import { ProfessorPaperView } from "@/components/PaperView/ProfessorPaperView/ProfessorPaperView";
import { StudentPaperView } from "@/components/PaperView/StudentPaperView/StudentPaperView";
import { getUserPapers } from "@/services/paperService";
import { useUserStore } from "@/stores/user/user.store";
import { useQuery } from "@tanstack/react-query";

export const PapersPage = () => {
  const user = useUserStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ["userPapers"],
    queryFn: getUserPapers,
  });

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="h-full p-4">
        {user?.role === "STUDENT" ? (
          <StudentPaperView papers={data} />
        ) : (
          <ProfessorPaperView papers={data} />
        )}
      </div>
    </div>
  );
};
