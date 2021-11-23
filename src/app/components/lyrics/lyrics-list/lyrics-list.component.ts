import { LyricsService } from './../lyrics.service';
import { Lyrics } from './../lyrics.model';
import { Component, Input, OnInit } from '@angular/core';
import { MDCTabBar } from '@material/tab-bar';

@Component({
  selector: 'app-lyrics-list',
  templateUrl: './lyrics-list.component.html',
  styleUrls: ['./lyrics-list.component.scss']
})
export class LyricsListComponent implements OnInit {

  @Input() idMusic: number = 0;

  lyricsList: Lyrics[] = [];
  lyricsView: string = "Carregando...";

  constructor(private lyricsService: LyricsService) { }

  ngOnInit(): void {

    console.log(this.idMusic)

    this.lyricsService.getLyricsByFilter(this.idMusic).subscribe(returnLyrics => {
      this.lyricsList = returnLyrics;
      console.log(this.lyricsList)
    });

  }

  viewLyricsValue(language: string) {
    this.lyricsList.forEach((lyric) => {
      if (lyric.language == language)
        this.lyricsView = lyric.lyricsText;
    });

    if(this.lyricsView.length > 0){
      let jsonLyric = JSON.stringify(this.lyricsView);
      this.lyricsView =  jsonLyric.replace(/\\r\\n/gi, "</br>");
    }
    else{
      this.lyricsView = "Nenhum letra encontrada!"
    }

    // this.lyricsView = this.lyricsView.length > 0 ? this.lyricsView : "Nenhum letra encontrada!";
    // console.log(this.lyricsView);
    // this.lyricsView = this.lyricsView.replace("\n", "</br>");
    // console.log(JSON.stringify(this.lyricsView));
    // console.log("\\n")
    
  } 


}
