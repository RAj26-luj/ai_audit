"use client";

import { motion } from "framer-motion";

import {
  NAV_ITEMS,
} from "./constants";

//nav links
export default function NavLinks() {

  //navigate
  const handleNavigation = (
    item: string
  ) => {

    const sectionMap: Record<string, string> = {
      Features: "features",
      Audit: "audit-form",
      Home: "hero",
    };

    const sectionId = sectionMap[item];

    if (!sectionId) return;

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>

      {NAV_ITEMS.map((item) => (

        <motion.button
          key={item}

          onClick={() =>
            handleNavigation(item)
          }

          whileHover={{ y: -1 }}

          className="group relative text-sm font-medium text-gray-400 hover:text-white transition-colors py-2 bg-transparent border-none outline-none cursor-pointer"
        >

          {item}

          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full" />

        </motion.button>

      ))}

    </>
  );
}