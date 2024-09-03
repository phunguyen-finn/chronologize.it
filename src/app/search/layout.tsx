import Link from "next/link";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-white dark:bg-black">
            {children}
            <div className="fixed bottom-0 w-full flex flex-col sm:flex-row justify-between p-5 sm:items-center gap-[5px] sm:gap-0 z-20">
                <div className="flex gap-[10px] sm:gap-[20px]">
                    <Link href='/' className="group text-black dark:white text-md sm:text-xl">
                        Home
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link>
                    <Link href='/about' className="group text-black dark:white text-md sm:text-xl">
                        About
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link>
                    <Link href='/about' className="group text-black dark:white text-md sm:text-xl">
                        How
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link>
                    <Link href='/about' className="group text-black dark:white text-md sm:text-xl">
                        Develop
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link>
                    {/* <Link href='/about' className="group text-black dark:white text-md sm:text-xl">
                        Donate
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link> */}
                </div>
                <Link href='/terms' className="relative text-gray-500 text-xs z-20">
                    Privacy Policy, Cookie Policy & Terms and Conditions →
                </Link>
            </div>
        </main >
    );
}
