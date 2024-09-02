'use client';

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  const search = (formData: any) => {
    const query = formData.get('query');
    router.push(`/search?query=${query}`);
  }

  return (
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
  );
}
