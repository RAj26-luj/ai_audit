// animated background

import { motion } from "framer-motion";

export default function LoadingBackground() {

  return (
    <>
      {/* blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
          }}

          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
          }}

          transition={{
            duration: 10,
            repeat: Infinity,
          }}

          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px]"
        />
      </div>

      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </>
  );
}