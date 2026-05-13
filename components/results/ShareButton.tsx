"use client";

import { Share2, Check, Link2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

//share button
export default function ShareButton() {

  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {

    const url = window.location.href;
    setSharing(true);

    try {

      //native share
      if (navigator.share) {
        await navigator.share({
          title: "StackAudit Report",
          text: "Check this AI spend optimization report generated with StackAudit.",
          url,
        });

        setSharing(false);
        return;
      }

      //clipboard
      await navigator.clipboard.writeText(url);

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

    } catch {

      try {

        //fallback copy
        const textArea = document.createElement("textarea");
        textArea.value = url;

        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2500);

      } catch {
        alert("Unable to copy report link.");
      }
    }

    setSharing(false);
  };

  return (

    <motion.button

      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}

      onClick={handleShare}

      className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:bg-white/10 hover:border-indigo-500/30 transition-all backdrop-blur-xl"
    >

      {/* icon */}
      {copied ? (
        <Check size={18} className="text-emerald-400" />
      ) : (
        <Share2 size={18} className={sharing ? "animate-pulse" : ""} />
      )}

      {/* text */}
      <div className="flex flex-col items-start">

        <span className="font-semibold text-sm">
          {copied ? "Copied!" : "Share Report"}
        </span>

        <span className="text-[11px] text-gray-500 flex items-center gap-1">
          <Link2 size={10} />
          Public audit link
        </span>

      </div>

    </motion.button>
  );
}