'use client';

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function FixedLayout({ children }: any) {
    return <main className="bg-white dark:bg-black">
        <FixedLayout.Header />
        {children}
        <FixedLayout.Footer />
    </main >
}

FixedLayout.Footer = function Footer() {
    return <div className="fixed bottom-0 w-full flex flex-col sm:flex-row justify-between p-5 sm:items-center gap-[5px] sm:gap-0 z-20">
        <div className="flex gap-[10px] sm:gap-[20px]">
            <Link href='/' className="group text-black dark:text-white text-md sm:text-xl">
                Home
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
            </Link>
            <Link href='/about' className="group text-black dark:text-white text-md sm:text-xl">
                About
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
            </Link>
        </div>
        <a target="_blank" href='http://instagram.com/phu.builds' className="group relative text-gray-500 text-xs z-20">
            Follow @finn.builds →
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
        </a>
    </div>
}

FixedLayout.Header = function Header() {
    return <div className="fixed top-0 left-0 p-5 z-20">
        <ThemeToggle />
    </div>
}