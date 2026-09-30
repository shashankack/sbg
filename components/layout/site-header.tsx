import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Navbar } from "@/components/layout/navbar";

export function SiteHeader() {
  return (
    <>
      <Navbar />
      <MobileNavbar />
    </>
  );
}
