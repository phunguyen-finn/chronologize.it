'use client';

import { Background } from '@/components/Background';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import * as NProgress from 'nprogress';

export default function Home() {
  const [time, setTime] = useState("");
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

  console.log(isSubmitting)

  return (
    <main className="max-w-screen overflow-hidden">
      {/* <div className="fixed top-0 right-0 p-5 z-20">
        <div className="inline-flex items-center">
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input id="switch-component" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
              defaultChecked />
            <label htmlFor="switch-component"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
      </div> */}

      <div className="relative max-w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl text-black dark:text-white">chronologize.it</h1>
          <h1 className="text-xs sm:text-base lg:text-xl text-black dark:text-white md:mt-3 md:mb-5 mt-2 mb-3">everything— from beginning to end</h1>
          <div className="w-11/12 md:w-[40%] relative">
            <form onSubmit={handleSubmit}>
              <input disabled={isSubmitting} name="query" type="text" className="disabled:cursor-not-allowed disabled:bg-gray-100 bg-white text-xs sm:text-base placeholder:text-gray-500 dark:bg-black w-full p-2 mt-4 rounded-lg border-black dark:border-white border-[1px] border-black" placeholder="Enter a topic" />
              <button type="submit" disabled={isSubmitting} className="disabled:cursor-not-allowed flex w-5 h-5 items-center justify-center hover:text-sky-700 dark:text-white absolute top-1/2 -translate-y-[20%] text-xl right-2">
                {isSubmitting ? <svg aria-hidden="true" className="inline text-black animate-spin dark:text-white fill-black dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg> : '→'}
              </button>
            </form>
          </div>
        </div>
        <Background />
        <div className='w-full h-[80%] absolute flex items-end justify-end -z-10'>
          <span className='mb-5 mr-5 sm:mb-10 sm:mr-10 text-gray-500 text-xs sm:text-base'>{time}</span>
        </div>
      </div>

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
        </div>
        <Link href='/terms' className="relative text-gray-500 text-xs z-20">
          Privacy Policy, Cookie Policy & Terms and Conditions →
        </Link>
      </div>
    </main >
  );
}
