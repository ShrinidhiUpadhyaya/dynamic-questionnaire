"use client";

import dynamic from "next/dynamic";

import loadingAnimation from "../app/LoadingAnimation.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const DLoadingComponent = () => {
  return (
    <div
      data-testid="loading-animation"
      className="flex h-svh w-svw items-center justify-center text-2xl">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default DLoadingComponent;
