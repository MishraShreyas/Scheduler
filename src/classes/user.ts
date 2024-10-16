export default interface User {
    userId: string;
    name: string;
    email: string;
    timezoneOffset: number; // in minutes
    createdAt: Date;
    events: string[]; // array of event ids
}

export function createUser(user: any, timezoneOffset: number) {
    if (!user) return null;
    let newUser: User = {
        userId: user.id,
        name: user.name,
        email: user.email,
        timezoneOffset: timezoneOffset,
        createdAt: new Date(),
        events: []
    };
    return newUser;
}