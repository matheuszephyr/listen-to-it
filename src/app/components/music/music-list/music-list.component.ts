import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
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
    this.musicService.listMusic(null, true).subscribe(returnMusics => {
      this.musics = returnMusics;
    });
  }  

  likeMusic(id: number = 0): void{
    console.log("curtida");            
  }

}
