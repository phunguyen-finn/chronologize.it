import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import BlurryCursor from "@/components/Cursor";
import Theme from '@/components/ThemeProvider';
import { ConfigProvider } from "antd";

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
    <html lang="en" suppressHydrationWarning>
      <body className={neueMontreal.className}>
        <Theme>
          <AntdRegistry>
            <NextTopLoader color="#9ca3af" showSpinner={false} />
            {children}
            <BlurryCursor />
          </AntdRegistry>
        </Theme>
      </body>
    </html>
  );
}
