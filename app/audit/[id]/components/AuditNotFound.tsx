import Link from "next/link";

//not found page
export default function AuditNotFound() {

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center px-4 text-center">

      <h1 className="text-5xl font-black tracking-tight">
        Audit Not Found
      </h1>

      <p className="mt-4 text-gray-400 max-w-lg text-lg leading-8">
        This audit may have expired, been deleted,
        or the link may be invalid.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition-transform"
      >
        Return Home
      </Link>
    </div>
  );
}