"use client";

import dynamic from "next/dynamic";
import loadingAnimation from "../app/LoadingAnimation.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const DLoadingComponent = () => {
  return (
    <div className="w-svw h-svh flex items-center justify-center text-2xl">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default DLoadingComponent;
