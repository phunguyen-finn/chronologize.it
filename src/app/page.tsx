'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  const search = (formData: any) => {
    const query = formData.get('query');
    router.push(`/search?query=${query}`);
  }

  return (
    <main className="bg-white dark:bg-black">
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

      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl text-black dark:text-white">chronologize.it</h1>
          <div className="w-11/12 md:w-1/2 relative">
            <form action={search}>
              <input name="query" type="text" className="placeholder:text-gray-500 dark:bg-black w-full p-2 mt-4 rounded-lg border-black dark:border-white border-[1px] border-black" placeholder="Enter a topic" />
              <button type="submit" className="hover:text-sky-700 dark:text-white absolute top-1/2 -translate-y-[20%] text-xl right-2">→</button>
            </form>
          </div>
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
