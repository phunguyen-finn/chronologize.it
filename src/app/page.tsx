'use client';

import { Background } from '@/components/Background';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import * as NProgress from 'nprogress';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [time, setTime] = useState("00:00:00 GMT+0700 (Indochina Time)");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const query = e.target.query.value;
    if (!query) return;

    setSubmitting(true);
    NProgress.start();
    router.push(`/search?query=${query}`);
  }

  useEffect(() => {
    const interval = setInterval(function () {
      setTime(new Date().toTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-screen overflow-hidden">
      <div className="fixed top-0 left-0 p-5 z-20">
        <ThemeToggle />
      </div>

      <div className="relative max-w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl text-black dark:text-white">chronologize.it</h1>
          <h1 className="text-xs sm:text-base lg:text-xl text-black dark:text-white md:mt-3 md:mb-5 mt-2 mb-3">everything— from beginning to end</h1>
          <div className="w-11/12 md:w-[40%] relative">
            <form onSubmit={handleSubmit}>
              <input disabled={isSubmitting} name="query" type="text" className="dark:text-white disabled:cursor-not-allowed disabled:bg-gray-100 bg-white text-xs sm:text-base placeholder:text-gray-500 dark:bg-black w-full p-2 mt-4 rounded-lg border-black dark:border-white border-[1px] border-black" placeholder="Enter a topic" />
              <button type="submit" disabled={isSubmitting} className="disabled:cursor-not-allowed flex w-5 h-5 items-center justify-center hover:text-sky-700 dark:text-white absolute top-1/2 -translate-y-[20%] text-xl right-2">
                {isSubmitting ? <svg aria-hidden="true" className="inline w-3 h-3 text-black animate-spin dark:text-white fill-white dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg> : '→'}
              </button>
            </form>
          </div>
        </div>
        <Background />
        <div className='w-full h-[80%] absolute flex items-end justify-end z-10 pointer-events-none'>
          <span className='mb-5 mr-5 sm:mb-10 sm:mr-10 text-gray-500 text-xs sm:text-base pointer-events-auto'>{time}</span>
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex flex-col sm:flex-row justify-between p-5 sm:items-center gap-[5px] sm:gap-0 z-20">
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
        <Link href='/terms' className="relative text-gray-500 text-xs z-20">
          Privacy Policy, Cookie Policy & Terms and Conditions →
        </Link>
      </div>
    </main >
  );
}
