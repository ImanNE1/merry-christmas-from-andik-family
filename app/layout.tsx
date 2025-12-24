import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: 'swap',
});

const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-great-vibes",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#051014',
};

export const metadata: Metadata = {
  title: "Merry Christmas 2025 | From Andik Family",
  description: "Season's Greetings - Selamat Natal dan Tahun Baru 2026 dari Keluarga Andik. Semoga damai dan sukacita menyertai Anda.",
  keywords: ["Christmas", "Natal", "Greeting", "Family", "Andik", "2025", "2026"],
  authors: [{ name: "Andik Family" }],
  openGraph: {
    title: "Merry Christmas 2025 | From Andik Family",
    description: "Season's Greetings - Selamat Natal dari Keluarga Andik",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merry Christmas 2025 | From Andik Family",
    description: "Season's Greetings - Selamat Natal dari Keluarga Andik",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body 
        className={`
          ${cinzel.variable} 
          ${montserrat.variable} 
          ${greatVibes.variable}
          bg-[#051014] 
          text-white 
          antialiased 
          overflow-x-hidden
          font-sans
        `}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}