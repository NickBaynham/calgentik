import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
