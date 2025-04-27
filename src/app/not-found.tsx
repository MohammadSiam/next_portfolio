// app/not-found.tsx (Next.js 13/14 App Router)

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page not found</p>
      <Link href="/" className="px-6 py-3 rounded-lg transition">
        Go back home
      </Link>
    </div>
  );
}
