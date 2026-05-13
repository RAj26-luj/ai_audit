"use client";

import {
  Menu,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  toggle: () => void;
};

//menu btn
export default function MobileMenuButton({
  open,
  toggle,
}: Props) {

  return (
    <button
      onClick={toggle}

      className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white"
    >

      {open
        ? <X size={22} />
        : <Menu size={22} />
      }

    </button>
  );
}