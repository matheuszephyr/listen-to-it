export interface User {
    id?: number
    email: string
    password: string
    name: string
    photo: string
    userType: string
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