"use client"
 
import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export default function Navbar() {
    const { theme, setTheme } = useTheme()

    return (
        <div className={cn('flex flex-row sticky top-0')}>
            <button onClick={() => setTheme("light")}>Light Mode</button>
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
        </div>
    )
}