import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import "@/lib/fontawesome";


import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { ProtectedLayout } from "@/components/Layouts/ProtectedLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description: "Next.js admin dashboard toolkit dengan komponen siap pakai.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <ProtectedLayout>{children}</ProtectedLayout>
        </Providers>
      </body>
    </html>
  );
}
