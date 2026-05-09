"use client";

import {
  Share2,
  Check,
} from "lucide-react";

import {
  useState,
} from "react";

export default function ShareButton() {

  const [copied, setCopied] =
    useState(false);

  const handleShare =
    async () => {

      const url =
        window.location.href;

      try {

        if (
          navigator.share
        ) {

          await navigator.share({
            title:
              "StackAudit Report",

            text:
              "Check this AI optimization report",

            url,
          });

          return;
        }

        await navigator.clipboard.writeText(
          url
        );

        setCopied(true);

        setTimeout(
          () =>
            setCopied(false),
          2000
        );

      } catch {

  try {

    const textArea =
      document.createElement(
        "textarea"
      );

    textArea.value =
      window.location.href;

    document.body.appendChild(
      textArea
    );

    textArea.select();

    document.execCommand(
      "copy"
    );

    document.body.removeChild(
      textArea
    );

    setCopied(true);

    setTimeout(
      () =>
        setCopied(false),
      2000
    );

  } catch {

    alert(
      "Copy failed"
    );
  }
}
    };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:bg-white/10 hover:border-indigo-500/30 transition"
    >

      {copied ? (
        <Check
          size={18}
          className="text-emerald-400"
        />
      ) : (
        <Share2 size={18} />
      )}

      {copied
        ? "Copied!"
        : "Share Report"}
    </button>
  );
}