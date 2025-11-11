import "@/styles/globals.css";

import { type Metadata } from "next";
import { Sora } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Anjar Dwi Hariadi",
  description: "Software Developer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
