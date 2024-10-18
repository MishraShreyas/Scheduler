'use client'

import User, { createUser } from "@/classes/user";
import { AddUser, GetUser } from "@/lib/mongodb";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react"
import { Button } from "../ui/button";

export default function TestPage() {
    const date = new Date().toString();
    const timezone = date.match(/\(([^\)]+)\)$/)?.[1] as string;
    var matches = timezone.match(/\b(\w)/g) as string[];
    var abbreviations = matches.join('');

    const {data: session} = useSession();

    const testing = async () => {
        const test = await GetUser(session?.user?.id as string);
        if (!test && session?.user) {
            console.log('user not found');
            await AddUser(JSON.stringify(session.user), new Date().getTimezoneOffset());
        } else console.log('user found', test);
    }
    return <div>
        {/* current time: */}
        {new Date().getTimezoneOffset()}
        <Button onClick={testing}>Test</Button>
    </div>;
}