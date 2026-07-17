import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GitHubStarsButton } from "@/components/github-stars-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Modern Date Picker",
  description:
    "A beautifully designed, modern date picker component built on top of shadcn/ui and react-day-picker v9. Replaces clumsy native dropdowns with fluid UI state transitions.",
  keywords: [
    "shadcn",
    "date picker",
    "react",
    "next.js",
    "ui component",
    "tailwind css",
    "calendar",
    "react-day-picker",
  ],
  authors: [{ name: "sunderlldev", url: "https://sunderll.dev" }],
  creator: "sunderlldev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadcn-modern-date-picker.vercel.app",
    title: "Shadcn Modern Date Picker",
    description:
      "A beautifully designed, modern date picker component built on top of shadcn/ui and react-day-picker v9.",
    siteName: "Shadcn Modern Date Picker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadcn Modern Date Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Modern Date Picker",
    description:
      "A beautifully designed, modern date picker component built on top of shadcn/ui and react-day-picker v9.",
    images: ["/og-image.png"],
    creator: "@sunderlldev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased dark`}>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-zinc-800`}
      >
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
            <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
              <a
                href="https://sunderll.dev"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <span className="font-bold">sunderll.dev</span>
              </a>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <GitHubStarsButton
                  username="sunderlldev"
                  repo="shadcn-modern-date-picker"
                />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="py-6">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <p>improved by sunderlldev ;)</p>
              <a
                href="https://github.com/sunderlldev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              <span className="sr-only">GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
