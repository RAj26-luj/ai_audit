//modal box
import { motion } from "framer-motion";

//wrapper
export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}

        animate={{ opacity: 1, scale: 1, y: 0 }}

        exit={{ opacity: 0, scale: 0.9, y: 20 }}

        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#09090B] shadow-2xl"
      >

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

        <div className="relative z-10 p-8">
          {children}
        </div>

      </motion.div>

    </motion.div>
  );
}