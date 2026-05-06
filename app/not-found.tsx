import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-3xl px-5 py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink">
        <BilingualText en="Page not found" zh="页面不存在" />
      </h1>
      <p className="mt-4 text-graphite">
        <BilingualText
          en="The portfolio section you are looking for is not published yet."
          zh="你要访问的作品集页面还没有发布。"
        />
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
      >
        <BilingualText en="Back home" zh="返回首页" />
      </Link>
    </main>
  );
}
