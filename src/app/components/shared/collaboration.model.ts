export interface UserCollaboration{
    idMusic?: number
    idAlbum?: number
    idLyrics?: number
    idUser: number
    userName?: string
    createdAt?: Date
}

export interface CollaborationFilter{
    idMusic?: number
    idAlbum?: number
    idLyrics?: number
    idArtist?: number
}