"use client";

import useQuestionnaires from "@/app/questionnaire/hooks/useQuestionnaires";
import { CustomError } from "@/types/common";
import { Questionnaire } from "@/types/common";
import { useRouter } from "next/navigation";

import DErrorPage from "../../components/DErrorPage";
import DLoadingComponent from "../../components/DLoadingComponent";
import { deleteResponses } from "./lib/response";

const QuestionnairePage = () => {
  const { data, isLoading, error } = useQuestionnaires();
  const router = useRouter();

  if (isLoading) return <DLoadingComponent />;
  if (error) return <DErrorPage error={error as CustomError} className="h-screen" />;

  const questionnaires: Questionnaire[] = data;

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
