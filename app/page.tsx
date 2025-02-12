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
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Button onClick={handleClick}>{t("start")}</Button>
      </main>
    </div>
  );
}
