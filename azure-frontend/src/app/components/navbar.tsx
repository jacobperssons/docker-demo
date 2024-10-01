"use client";

import {
    UserGroupIcon,
    HomeIcon,
    NumberedListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { definitions } from "@/app/lib/definitions";

export default function Navbar() {
    const pathname = usePathname();

    const navigation = [
        {
            name: "Home",
            href: "/",
            icon: HomeIcon,
        },
        {
            name: "Todos",
            href: "/todos",
            icon: NumberedListIcon,
        },
        {
            name: "About",
            href: "/about",
            icon: UserGroupIcon,
        },
    ];

    return (
        <div className="relative top-0 z-0 w-full px-4 py-4 grid grid-cols-3">
            <div className="col-span-1">
                <Link href={"/"}>
                    <Image
                        className="left-0 dark:invert"
                        src="https://nextjs.org/icons/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />
                </Link>
            </div>
            <nav className="col-span-1 flex justify-center">
                <ul className="absolute flex flex-row space-x-6">
                    {navigation.map((nav) => {
                        const Icon = nav.icon;
                        return (
                            <li
                                className="text-xl hover:text-blue-900 hover:font-semibold"
                                key={nav.name}
                            >
                                <Link
                                    className={clsx(
                                        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                        {
                                            "bg-sky-100 text-blue-600":
                                                pathname === nav.href,
                                        }
                                    )}
                                    href={nav.href}
                                >
                                    <Icon className="w-6" />
                                    {nav.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="flex justify-end">
                <button>
                    <Link
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-green-500 shadow-sm shadow-black p-3 text-sm font-medium text-white hover:bg-green-700 md:flex-none md:justify-start md:p-2 md:px-3"
                        href={`${definitions.BASE}/${definitions.LOGIN}`}
                    >
                        Login
                    </Link>
                </button>
            </div>
        </div>
    );
}
