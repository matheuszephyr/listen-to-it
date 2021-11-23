import { MusicService } from '../music.service';
import { Component, OnInit } from '@angular/core';
import { Music } from '../music.model';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  musics!: Music[]

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.listMusic().subscribe(returnMusics => {
      this.musics = returnMusics;
    });
  }  

  likeMusic(id: number = 0): void{
    console.log("curtida");            
  }

}
