import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Blog', href: '/Blogs', current: false },
  { name: 'Find a Job', href: '/JobForum', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Data = () => {
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">

          <div className="space-y-1 px-5 pt-2 pb-3">
            <div className="mb-5">
              <div className="flex items-center gap-2 ml-2 ">
                <Link href={"/Profile"}>
                  <Image height={600} width={600} className="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </Link>
                <div className="font-medium ">
                  <div>Talha Hussain</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                </div>
              </div>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                  'px-2 py-1 text-lg font-normal opacity-75 block'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <Link href={"/Login"}>
              <button className="bg-white w-full text-midnightblue border border-midnightblue font-medium py-2 px-4 rounded">
                Log In
              </button>
            </Link>

            <button className="bg-midnightblue w-full hover:bg-blue hover:text-white text-white font-medium my-2 py-2 px-4 rounded">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
