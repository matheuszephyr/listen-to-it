export interface Submit {
    id?: number
    idMusic?: number
    idAlbum?: number
    idUser: number
    idArtist?: number
    idLyrics?: number
    musicName?: string
    artistName?: string
    albumName?: string
    albumYear?: string
    lyricsText?: string
    lyricsLanguage?: string
    spotifyCode?: string
    youtubeCode?: string
    status: string
    submitType: string
    isUpdate: boolean
    createdAt: Date
}

export enum SubmitType {
    Music,
    Artist,
    Album,
    Lyrics
} 

export enum SubmitStatus{
    Analise,
    Processando,
    Aprovado,    
    Recusado
}