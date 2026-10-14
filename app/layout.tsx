import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BilingualText } from "@/components/bilingual-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { openGraphBase, site } from "@/lib/site";

const preferenceBootstrapScript = `(function(){var d=document.documentElement;try{var l=localStorage.getItem("portfolio-language");if(l!=="zh"&&l!=="en"){l="en";}d.dataset.lang=l;d.lang=l==="zh"?"zh-CN":"en";}catch(e){d.dataset.lang="en";d.lang="en";}var t;try{t=localStorage.getItem("portfolio-theme");}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}d.dataset.theme=t;d.style.colorScheme=t;var c=t==="light"?"#eeede9":"#080808";var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].content=c;}})();`;

const signalDisplay = localFont({
  src: "./fonts/BarlowCondensed-SemiBold.ttf",
  variable: "--font-signal-display",
  display: "swap",
  weight: "600"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Alvin Li"
  },
  description: site.description,
  icons: {
    icon: [{ url: "/brand/iridium-mark.png", type: "image/png" }]
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eeede9" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" }
  ],
  colorScheme: "dark light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-lang="en"
      data-scroll-behavior="smooth"
      className={signalDisplay.variable}
      suppressHydrationWarning
    >
      <body>
        <script
          id="portfolio-preference-bootstrap"
          dangerouslySetInnerHTML={{
            __html: preferenceBootstrapScript
          }}
        />
        <a className="skip-link" href="#main-content">
          <BilingualText en="Skip to content" zh="跳到主要内容" />
        </a>
        <SiteHeader />
        <div id="main-content" className="site-main-target" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
