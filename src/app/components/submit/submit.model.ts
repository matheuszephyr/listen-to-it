export interface Submit {
    id?: number,
    idMusic?: number,
    idAlbum?: number,
    idUser: number,
    idArtist?: number,
    idLyrics?: number,
    musicName?: string,
    artistName?: string,
    albumName?: string,
    lyrics?: string,
    lyricsLanguage?: string,
    spotifyCode?: string,
    youtubeCode?: string,
    submitType: string,
    isUpdate: boolean,
    createdAt: Date
}

export enum SubmitType {
    Music,
    Artist,
    Album,
    Lyrics
} 