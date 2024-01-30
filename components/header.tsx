'use client'

import { Code } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 border-b backdrop-blur-lg">
            <div className="flex items-center gap-2">
                <Link className="flex items-center gap-2" href="#">
                    <Code className="h-6 w-6" />
                    <span className="text-lg font-semibold">code.dev</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                href="#"
                            >
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                href="#"
                            >
                                About
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                href="#"
                            >
                                Contact
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
            </div>
        </header>
    )
}