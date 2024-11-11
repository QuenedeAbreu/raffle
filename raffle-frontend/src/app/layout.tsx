import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Rifas",
  description: "Rifas",
  icons: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
