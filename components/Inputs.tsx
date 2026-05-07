"use client";

import React from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { TOOLS_CONFIG } from "@/data/tools";

type FormDataType = {
  selectedTools: string[];
};

type InputsProps = {
  formData: FormDataType;

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;
};

export default function Inputs({
  formData,
  setFormData,
}: InputsProps) {

  // select
  const toggleTool = (toolId: string) => {
    const exists =
      formData.selectedTools.includes(toolId);

    setFormData((prev: FormDataType) => ({
      ...prev,

      selectedTools: exists
        ? prev.selectedTools.filter(
            (t: string) => t !== toolId
          )
        : [...prev.selectedTools, toolId],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* header */}
      <header className="mb-12 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Sparkles size={12} />

          AI Stack Inventory
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Select Your AI Workspace
        </h2>

        <p className="text-gray-500 mt-4 text-lg">
          Choose the platforms powering your
          development workflow.
        </p>
      </header>

      {/* grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TOOLS_CONFIG.map((tool, index) => {
          const isSelected =
            formData.selectedTools.includes(
              tool.id
            );

          return (
            <motion.button
              key={tool.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: -5,

                transition: {
                  duration: 0.2,
                },
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                toggleTool(tool.id)
              }
              className={`relative group p-1 rounded-3xl transition-all duration-500 ${
                isSelected
                  ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_20px_50px_rgba(99,102,241,0.3)]"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div
                className={`relative h-full w-full rounded-[22px] p-6 flex flex-col items-center text-center gap-4 transition-colors duration-500 ${
                  isSelected
                    ? "bg-black/80 backdrop-blur-xl"
                    : "bg-[#0A0A0A]"
                }`}
              >

                {/* shine */}
                <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* icon */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 blur-2xl transition-opacity duration-500 ${
                      isSelected
                        ? "bg-indigo-500/40 opacity-100"
                        : "bg-white/5 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                      isSelected
                        ? "border-indigo-400/50 bg-white/5 scale-110"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* info */}
                <div className="space-y-1">
                  <div
                    className={`font-bold text-lg tracking-tight transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  >
                    {tool.name}
                  </div>

                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    {isSelected
                      ? "Connected"
                      : "Tap to Enable"}
                  </div>
                </div>

                {/* active */}
                {isSelected && (
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -45,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    className="absolute top-3 right-3 text-indigo-400"
                  >
                    <CheckCircle2
                      size={20}
                      fill="currentColor"
                      className="text-black"
                    />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* footer */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="mt-12 flex justify-center items-center gap-2 text-gray-500 text-sm"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />

        Progress automatically saved locally
      </motion.div>
    </div>
  );
}