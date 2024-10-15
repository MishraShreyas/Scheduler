"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BellIcon, HamburgerMenuIcon, HomeIcon, MagnifyingGlassIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import User from "./user"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

interface Navigation {
    title: string,
    icon: React.ReactNode,
    href: string,
    target: string,
}

export default function Navbar({children}: {children: React.ReactNode}) {
    const { theme, setTheme } = useTheme()
    const path = usePathname()

    const [currTheme, setCurrTheme] = useState<string | undefined>("")

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }
    
    const navigation: Navigation[] = [
        {
            title: "Home",
            icon: <HomeIcon className="h-5 w-5" />,
            href: "/",
            target: "_self",
        },
    ]

    useEffect(() => {
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            setCurrTheme(systemTheme)
        } else setCurrTheme(theme)
    }, [theme])

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-4">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                        {/* Logo <Package2 className="h-6 w-6" /> */}
                        <span className="">Auto Scheduler</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <BellIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navigation.map((item, index) => (
                                <Link href={item.href} key={index} target={item.target}
                                    className={
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all " +
                                        (item.href.startsWith(path) ?
                                        "bg-gradient-to-r from-primary to-primary/60 text-primary-foreground" :
                                        "hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary/60 hover:to-primary/40")
                                    }
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="A card with a call to action">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Check out</CardTitle>
                                <CardDescription>
                                Check out the Github
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <HamburgerMenuIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            {/* <Package2 className="h-6 w-6" /> */}
                            <span className="sr-only">Scheduler</span>
                        </Link>
                        {navigation.map((item, index) => (
                            <Link href={item.href} key={index} target={item.target}
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-auto">
                        <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                            Unlock all features and get unlimited access to our
                            support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" className="w-full">
                            Upgrade
                            </Button>
                        </CardContent>
                        </Card>
                    </div>
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
                <Button variant='ghost' size='icon' className="rounded-full relative" onClick={toggleTheme}>
                    {currTheme === "dark" ?
                        <SunIcon className="h-5 w-5 absolute top-auto left-auto" /> :
                        <MoonIcon className="h-5 w-5 absolute top-auto left-auto" />
                    }
                    <span className="sr-only">Toggle {currTheme} mode</span>
                </Button>
                <User/>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}