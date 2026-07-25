import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Consciente",
  description: "Uso consciente e seguro da inteligência artificial.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
