// bottom badges

import {
  ShieldCheck,
  Database,
  Search,
} from "lucide-react";

const badges = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Secure",
  },

  {
    icon: <Database className="w-5 h-5" />,
    label: "Encrypted",
  },

  {
    icon: <Search className="w-5 h-5" />,
    label: "Detailed",
  },
];

export default function LoadingBadges() {

  return (
    <div className="mt-14 flex gap-10">

      {badges.map((item, index) => (

        <div
          key={index}

          className="flex flex-col items-center gap-2 opacity-50"
        >

          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">

            {item.icon}
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">

            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}