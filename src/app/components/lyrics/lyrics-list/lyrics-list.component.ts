import { LyricsService } from './../lyrics.service';
import { Lyrics } from './../lyrics.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lyrics-list',
  templateUrl: './lyrics-list.component.html',
  styleUrls: ['./lyrics-list.component.scss']
})
export class LyricsListComponent implements OnInit {

  @Input() idMusic: number = 0;

  lyricsList: Lyrics[] = [];
  lyricsView: Lyrics = {
    id: 0,
    language: "",
    lyricsText: "Selecione uma linguagem para ver a letra!",
    original: false,
    idMusic: 0,
    createdAt: new Date
  };


  constructor(private lyricsService: LyricsService) { }

  ngOnInit(): void {

    this.lyricsService.getLyricsByFilter(this.idMusic).subscribe(returnLyrics => {

      returnLyrics.forEach((lyric) => {
        let jsonLyric = JSON.stringify(lyric.lyricsText);
        lyric.lyricsText = jsonLyric.replace(/\\r\\n/gi, "</br>").trimEnd().trim();
      });;

      this.lyricsList = returnLyrics;
    });

  }

  viewLyricsValue(language: string) {

    this.lyricsList.forEach((lyric) => {
      if (lyric.id > 0 && lyric.language == language && lyric.lyricsText.length > 0) {
        this.lyricsView = lyric;
        return;
      }
    });

  }


}
