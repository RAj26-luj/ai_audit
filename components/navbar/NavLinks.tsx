// desktop nav links

import { motion } from "framer-motion";

import {
  NAV_ITEMS,
} from "./constants";

export default function NavLinks() {

  return (
    <>
      {NAV_ITEMS.map((item) => (

        <motion.a
          key={item}

          href="#"

          whileHover={{
            y: -1,
          }}

          className="group relative text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
        >

          {item}

          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
        </motion.a>
      ))}
    </>
  );
}