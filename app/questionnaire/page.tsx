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
      <div className="flex h-svh w-svw items-center justify-center text-2xl">
        Error: {error.message}
      </div>
    );

  const { questionnaires }: { questionnaires: Questionnaire[] } = data;

  const handleClick = (id: string) => {
    router.push(`/questionnaire/${id}`);
  };

  deleteResponses();

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-4 p-16">
      <div className="grid gap-4 md:grid-cols-2">
        {questionnaires?.map((questionnaire) => (
          <div
            key={questionnaire.id}
            onClick={() => handleClick(questionnaire.id)}
            className="cursor-pointer rounded-lg border border-gray-200 p-8 text-center shadow-md transition-shadow hover:shadow-lg">
            {questionnaire.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionnairePage;
