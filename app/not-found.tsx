import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-3xl px-5 py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink">Page not found / 页面不存在</h1>
      <p className="mt-4 text-graphite">The portfolio section you are looking for is not published yet.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
      >
        Back home / 返回首页
      </Link>
    </main>
  );
}
