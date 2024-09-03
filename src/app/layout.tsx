import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";

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
      <body className={neueMontreal.className}>
        <AntdRegistry>
          <NextTopLoader color="black" showSpinner={false} />
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
