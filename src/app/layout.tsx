import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Link from "next/link";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const neueMontreal = localFont({
  src: [
    {
      path: '../fonts/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
})

export const metadata: Metadata = {
  title: "chronologize.it",
  description: "Learn from the beginning of time to the end of time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <body className={neueMontreal.className}>
          {children}
        </body>
      </AntdRegistry>
    </html>
  );
}
