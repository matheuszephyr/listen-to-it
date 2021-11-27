export interface Music {
    id?: number
    musicName: string
    idArtist: number
    artistName: string
    idAlbum: number    
    albumName: string
    userLiked: boolean
    likeCount: number
    commentCount: number
    spotifyCode: string
    youtubeCode: string
    haveLyrics: boolean
    createdAt: Date
    updatedAt?: Date
}

export interface MusicSubmit {
    id?: number,
    idMusic?: number,
    idAlbum?: number,
    idUser: number,
    musicName: string,
    artistName: string,
    albumName: string,
    lyrics: string,
    lyricsLanguage: string,
    spotifyLink: string,
    youtubeLink: string,
    officialLink: string,
    submitType: string,
    update: boolean,
    createdAt: Date
}

export interface MusicFilter{
    idUser?: number
    musicName?: string
    artistName?: string
}