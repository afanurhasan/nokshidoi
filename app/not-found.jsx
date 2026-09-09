import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold text-slate-800">404 - Page Not Found</h2>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Return Home
      </Link>
    </div>
  );
}
