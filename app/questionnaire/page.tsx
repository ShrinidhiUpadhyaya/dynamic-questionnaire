"use client";
import useQuestionnaires from "@/app/questionnaire/hooks/useQuestionnaires";
import { Questionnaire } from "@/types/question";
import { useRouter } from "next/navigation";
import DLoadingComponent from "../../components/DLoadingComponent";
import { deleteResponses } from "./lib/response";

const QuestionnairePage = () => {
  const { data, isLoading, error } = useQuestionnaires();
  const router = useRouter();

  if (isLoading) return <DLoadingComponent />;
  if (error)
    return (
      <div className="w-svw h-svh flex items-center justify-center text-2xl">
        Error: {error.message}
      </div>
    );

  const { questionnaires }: { questionnaires: Questionnaire[] } = data;

  const handleClick = (id: string) => {
    router.push(`/questionnaire/${id}`);
  };

  deleteResponses();
  
  return (
    <div className="flex flex-col gap-4 p-16 w-full h-svh items-center justify-center">
      <div className="grid md:grid-cols-2 gap-4">
        {questionnaires?.map((questionnaire) => (
          <div
            key={questionnaire.id}
            onClick={() => handleClick(questionnaire.id)}
            className="hover:shadow-lg transition-shadow shadow-md p-8 rounded-lg border border-gray-200 cursor-pointer text-center"
          >
            {questionnaire.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionnairePage;
