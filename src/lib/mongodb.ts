'use server'
import User, { createUser } from '@/classes/user';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string

if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

async function connectToDatabase() {
    const client = new MongoClient(uri)
    return await client.connect()
}

export async function GetUser(userId: string) {
    const client = await connectToDatabase()
    const db = client.db('schedules')
    const data = await db.collection('users').find({
        userId: userId
    }).toArray()
    await client.close()

    if (data.length === 0) {
        return null
    } else {
        return data[0]
    }
}

export async function AddUser(user: string, timezoneOffset: number) {
    const userData = createUser(JSON.parse(user), timezoneOffset)
    if (!userData) {
        return null
    }
    
    const client = await connectToDatabase()
    const db = client.db('schedules')
    const id = await db.collection<User>('users').insertOne(userData)
    await client.close()
    return id
}