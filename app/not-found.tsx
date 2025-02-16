"use client";

import { Label } from "@/components/ui/label";
import notFoundAnimation from "@/public/NotFound.json";
import Lottie from "lottie-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-svh w-svw items-center justify-center gap-16">
      <Lottie animationData={notFoundAnimation} loop={true} />
      <div className="w-1/4">
        <Label>Sorry the page you are looking for does not exist. Try going to </Label>
        <Link href="/questionnaire" className="text-xl font-extrabold text-primary hover:underline">
          Questionnaire
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
