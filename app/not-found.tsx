import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

export default function NotFound() {
  return (
    <main className="signal-theme bench-not-found">
      <h1 className="bench-title-text">
        <BilingualText en="Page not found" zh="页面不存在" />
      </h1>
      <p className="bench-lede">
        <BilingualText
          en="The portfolio section you are looking for is not published yet."
          zh="你要访问的作品集页面还没有发布。"
        />
      </p>
      <Link
        href="/"
        className="bench-action signal-fill"
      >
        <BilingualText en="Back home" zh="返回首页" />
      </Link>
    </main>
  );
}
