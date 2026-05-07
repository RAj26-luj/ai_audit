// mobile hamburger button

export default function MobileMenuButton() {

  return (
    <div className="md:hidden">

      <button className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors">

        <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full" />

        <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full" />

        <div className="w-4 h-0.5 bg-white ml-2 rounded-full" />
      </button>
    </div>
  );
}