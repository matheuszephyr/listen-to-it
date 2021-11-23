export interface Music {
    id?: number
    name: string
    idArtist: number
    artistName: string
    idAlbum: number
    albumName: string
    userLiked: boolean
    likeCount: number
    commentCount: number
    spotifyLink: string
    youtubeLink: string
    haveLyrics: boolean
    createdAt: Date
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