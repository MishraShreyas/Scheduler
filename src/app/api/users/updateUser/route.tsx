import { AddUser, GetUser } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const json = await req.json()
    const { id, name, email } = json
    const userData = await GetUser(id)
    if (!userData) {
        await AddUser(JSON.stringify({id, name, email}), new Date().getTimezoneOffset())
    }
    return NextResponse.json({status: 'success'})
}