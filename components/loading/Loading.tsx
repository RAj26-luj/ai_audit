"use client";

//loading page
import LoadingBackground from "./LoadingBackground";
import LoadingCore from "./LoadingCore";

import LoadingStatus from "./LoadingStatus";
import LoadingBadges from "./LoadingBadges";

import {
  useLoadingStatus,
} from "./hooks/useLoadingStatus";

//loading screen
export default function Loading() {

  const {
    statuses,
    statusIndex,
  } = useLoadingStatus();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020205] px-4">

      {/* bg */}
      <LoadingBackground />

      <div className="relative z-10 w-full max-w-2xl">

        <div className="relative rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-12 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

          <div className="relative flex flex-col items-center">

            {/* core */}
            <LoadingCore />

            {/* status */}
            <LoadingStatus
              statuses={statuses}
              statusIndex={statusIndex}
            />

            {/* badges */}
            <LoadingBadges />

          </div>

        </div>

      </div>

    </div>
  );
}