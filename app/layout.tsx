import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BilingualText } from "@/components/bilingual-text";
import { PaperRouteTransitionProvider } from "@/components/paper-route-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { openGraphBase, site } from "@/lib/site";

const languageBootstrapScript = `try{var l=localStorage.getItem("portfolio-language");if(l!=="zh"&&l!=="en"){l="en";}document.documentElement.dataset.lang=l;document.documentElement.lang=l==="zh"?"zh-CN":"en";}catch(e){document.documentElement.dataset.lang="en";document.documentElement.lang="en";}`;

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
          id="portfolio-language-bootstrap"
          dangerouslySetInnerHTML={{
            __html: languageBootstrapScript
          }}
        />
        <PaperRouteTransitionProvider>
          <a className="skip-link" href="#main-content">
            <BilingualText en="Skip to content" zh="跳到主要内容" />
          </a>
          <SiteHeader />
          <div id="main-content" className="site-main-target" tabIndex={-1}>
            {children}
          </div>
          <SiteFooter />
        </PaperRouteTransitionProvider>
      </body>
    </html>
  );
}
