import React, { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { DiscordLogoIcon, ExitIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"

export default function UserManager() {
    const { data: session } = useSession()

    const userImage = session?.user?.image || ""

    if (session) return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full bg-violet-600 hover:bg-violet-400">
                    {userImage ?
                        <img src={userImage} alt="User avatar" className="rounded-full border-secondary border-2"/> :
                        <PersonIcon className="h-5 w-5" />
                    }
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-80 w-50">
                <div className="grid gap-4 p-2">
                    <div className="flex flex-row">
                        {userImage ?
                            <img src={userImage} alt="User avatar" className="rounded-full h-12 w-12"/> :
                            <PersonIcon className="h-12 w-12" />
                        }
                        <div className="ml-4">
                            <h4 className="text-xl font-semibold tracking-tight">{session?.user?.name}</h4>
                            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                        </div>
                    </div>
                    <Separator/>
                    <div className="flex justify-end">
                        <Button size='sm' onClick={async () => await signOut()}>
                            <ExitIcon className="h-4 w-4 mr-2" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
    else return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full bg-violet-600 hover:bg-violet-400">
                    <PersonIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-80 w-50">
                <div className="grid gap-4 p-4">
                    <div className="rounded-full bg-primary w-10 h-10 mx-auto flex content-center">
                        <LockClosedIcon className="w-6 h-6 text-primary-foreground m-auto" />
                    </div>
                    <h4 className="border-b pb-2 text-xl font-semibold tracking-tight text-center">Sign in to your account</h4>
                    <Button onClick={async () => await signIn("discord")}>
                        <DiscordLogoIcon className="h-5 w-5 mr-2" />
                        Sign in with Discord
                    </Button>
                    {/* <Button onClick={async () => await signIn("google")}>
                        Sign in with Google
                    </Button> */}
                </div>
            </PopoverContent>
        </Popover>
    )
}