// loading text cycle logic

import {
  useEffect,
  useState,
} from "react";

export function useLoadingStatus() {

  const [statusIndex, setStatusIndex] =
    useState(0);

  // loading messages
  const statuses = [
    "Initializing deep scan...",
    "Analyzing AI subscriptions...",
    "Detecting unused enterprise seats...",
    "Checking pricing inefficiencies...",
    "Verifying optimization patterns...",
    "Generating financial recovery report...",
  ];

  // cycle text
  useEffect(() => {

    const interval = setInterval(() => {

      setStatusIndex((prev) =>
        (prev + 1) % statuses.length
      );

    }, 2500);

    return () =>
      clearInterval(interval);

  }, []);

  return {
    statuses,
    statusIndex,
  };
}