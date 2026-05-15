import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DemoNav } from "@/components/shell/DemoNav";
import "./globals.css";

// Brand fonts — Inter for everything UI, JetBrains Mono for credentials/dates/numbers
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DogWorld(tmp)",
  description:
    "Mobil-først SaaS for kennel-eiere og oppdrettere. Erstatter den hjemmesnekrede kennelnettsiden og Excel-arket — én løsning, én sannhet.",
  other: { "content-language": "nb-NO" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <DemoNav />
      </body>
    </html>
  );
}
