"use client";
import useSections from "./hooks/useSections";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const SectionsPage = () => {
  const { data, isLoading, error } = useSections();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { questionnaires } = data;

  const handleClick = (id: string) => {
    router.push(`/questionnaire/${id}/question`);
  };

  return (
    <div className="flex flex-col gap-4 p-16 w-full h-svh items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        {questionnaires?.map((questionnaire) => (
          <div
            key={questionnaire.id}
            onClick={() => handleClick(questionnaire.id)}
            className="hover:shadow-lg transition-shadow shadow-md p-8 rounded-lg border border-gray-200 cursor-pointer"
          >
            {questionnaire.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsPage;
