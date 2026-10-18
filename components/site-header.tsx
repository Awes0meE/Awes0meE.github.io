import { SitePreferences } from "@/components/site-preferences";
import { Logo } from "@/components/logo";
import { SiteNavigation } from "@/components/site-navigation";

export function SiteHeader() {
  return (
    <header
      className="site-header sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="site-header-inner mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-2 px-5 py-4 sm:gap-4 lg:px-8">
        <Logo />
        <SiteNavigation variant="desktop" />
        <div className="flex shrink-0 items-center gap-2">
          <SitePreferences />
        </div>
      </div>
      <SiteNavigation variant="mobile" />
    </header>
  );
}
