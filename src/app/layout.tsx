import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | QEVN Pitch",
    default: "QEVN Pitch — High-Converting Sales Pitch Generator",
  },
  description: "Generate tailored cold emails, cold call openers, and LinkedIn DMs for your business in under 60 seconds. Powered by QEVN.",
  metadataBase: new URL("https://pitch.qevn.in"),
  openGraph: {
    title: "QEVN Pitch — High-Converting Sales Pitch Generator",
    description: "Generate tailored cold emails, cold call openers, and LinkedIn DMs for your business in under 60 seconds.",
    type: "website",
    locale: "en_US",
    url: "https://pitch.qevn.in",
    siteName: "QEVN Pitch",
  },
  twitter: {
    card: "summary_large_image",
    title: "QEVN Pitch — High-Converting Sales Pitch Generator",
    description: "Generate tailored cold emails, cold call openers, and LinkedIn DMs for your business in under 60 seconds.",
    creator: "@qevnhq",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-void text-bone antialiased selection:bg-acid selection:text-void">
      <body className="min-h-full flex flex-col font-sans">
        <div className="noise-overlay" />
        <div className="flex-1 flex flex-col relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
