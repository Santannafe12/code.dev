'use client'

import { Code, Menu, X } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { Button } from "./ui/button";

const links = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Posts',
        href: '/posts',
    }
]

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false)

    const handleNavOpen = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (
        <header className="sticky top-0 left-0 right-0 z-50 border-b backdrop-blur-lg mb-8">
            <section className="flex items-center justify-between px-4 sm:px-12 sm:mb-0 py-2">
                <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2" href="/">
                        <Code className="h-6 w-6" />
                        <span className="text-lg font-semibold">code.dev</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2 sm:gap-12">
                    <NavigationMenu>
                        <NavigationMenuList className="hidden sm:flex items-center gap-4">
                            {links.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        className="h-9 w-max rounded-md bg-gray-200 px-4 py-2 text-md font-medium hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Button variant="outline" className="p-2 sm:hidden" onClick={handleNavOpen}>
                        {isNavOpen ? <X /> : <Menu />}
                    </Button>
                    <ModeToggle />
                </div>
            </section>
            {isNavOpen && <MobileHeader />}
        </header>
    )
}

function MobileHeader() {
    return (
        <div className="sm:hidden flex flex-col gap-3 px-12 py-2 space-y-1">
            {links.map((link, index) => (
                <Link key={index} href={link.href} className="font-medium">
                    {link.name}
                </Link>
            ))}
        </div>
    )
}