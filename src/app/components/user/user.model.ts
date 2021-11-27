export interface User {
    id?: number
    email: string
    passwordHash: string
    userName: string
    image: string
    userType: string
    userScore: number
    createdAt: Date
}

export interface UserSession{
    id?: number
    email?: string
    name?: string
    photo?:string
    userType?: string
    createdAt?: Date
}

export enum UserType{
    System = 1,
    Admin = 2,
    User = 3
}