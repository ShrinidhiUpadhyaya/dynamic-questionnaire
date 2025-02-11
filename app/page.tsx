"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { t } from "./locales/translation";

export default function HomePage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/questionnaire");
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button onClick={handleClick}>{t("start")}</Button>
      </main>
    </div>
  );
}
