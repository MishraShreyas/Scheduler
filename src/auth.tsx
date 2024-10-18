import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials"

async function updateUser(id: string, name: string, email: string) {
    const uri = process.env.HOST_URI+'/api/users/updateUser'
    return await fetch(uri, {
        method: 'POST',
        body: JSON.stringify({ id, name, email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function getDiscordId(access_token: string) {
    const userData = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data = await userData.json()
    return data.id
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null
        
                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)
        
                // logic to verify if the user exists
                // user = await getUserFromDb(credentials.email, pwHash)
        
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.")
                }
        
                // return user object with their profile data
                return user
            },
        }),
        Google,
        Discord
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.access_token) {
                    const id = await getDiscordId(account.access_token)
                    user.id = id
                    token.id = id
                    updateUser(id, user.name as string, user.email as string)
                } else {
                    token.id = user.id
                }
            }
            return token
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string
            }
            return session
        },
    }
})