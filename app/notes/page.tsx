import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScrollText } from "lucide-react";
import { getNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes / 笔记"
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <h1 className="text-5xl font-semibold text-ink">Notes / 学习笔记</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">
        A growing archive for control, embedded systems, robotics, and engineering practice. 这里先用 MDX 文件管理，方便以后持续补充。
      </p>
      <div className="mt-10 divide-y divide-line rounded-lg border border-line bg-white">
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} className="grid gap-4 p-5 transition hover:bg-chalk md:grid-cols-[44px_1fr_auto]">
            <span className="grid h-11 w-11 place-items-center rounded-md border border-line text-pine">
              <ScrollText size={19} />
            </span>
            <span>
              <span className="block text-xl font-semibold text-ink">{note.titleZh}</span>
              <span className="mt-1 block text-sm text-graphite">{note.title}</span>
              <span className="mt-3 block leading-7 text-graphite">{note.summaryZh}</span>
              <span className="mt-3 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="rounded border border-line bg-paper px-2 py-1 text-xs text-graphite">
                    {tag}
                  </span>
                ))}
              </span>
            </span>
            <span className="flex items-center gap-3 text-sm text-graphite">
              {note.date}
              <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
