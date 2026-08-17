import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { openGraphBase, site } from "@/lib/site";

const languageBootstrapScript = `try{var l=localStorage.getItem("portfolio-language");if(l!=="zh"&&l!=="en"){l="zh";}document.documentElement.dataset.lang=l;document.documentElement.lang=l==="zh"?"zh-CN":"en";}catch(e){document.documentElement.dataset.lang="zh";document.documentElement.lang="zh-CN";}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Alvin Li"
  },
  description: site.description,
  openGraph: {
    ...openGraphBase,
    title: site.title,
    description: site.description,
    url: site.url
  },
  twitter: {
    title: site.title,
    description: site.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-lang="zh" suppressHydrationWarning>
      <body>
        <script
          id="portfolio-language-bootstrap"
          dangerouslySetInnerHTML={{
            __html: languageBootstrapScript
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
