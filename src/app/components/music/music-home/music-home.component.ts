import { UserService } from './../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from './../music.model';
import { MusicService } from './../music.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-home',
  templateUrl: './music-home.component.html',
  styleUrls: ['./music-home.component.scss']
})
export class MusicHomeComponent implements OnInit {

  musicModel: Music = {
    musicName: "Carregando...",
    artistName: "Carregando...",
    spotifyCode: "",
    youtubeCode: "",
    albumName: "Carregando...",
    commentCount: 0,
    haveLyrics: false,
    idAlbum: 0,
    idArtist: 0,
    likeCount: 0,
    userLiked: false,
    createdAt: new Date
  };
  userLoged = false;
  idMusic: number = 0;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.idMusic = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "");
    this.userLoged = this.userService.loged();

    this.musicService.getMusicById(this.idMusic).subscribe(musicResult => {

      this.musicModel = musicResult;

      if (this.musicModel.youtubeCode.length > 0) {
        let tag = document.getElementById('youtubeframe');
        tag.setAttribute('src', 'https://www.youtube.com/embed/' + this.musicModel.youtubeCode);
      }
      //document.body.appendChild(tag);
      //  setTimeout(()=>{                           
      //   this.musicModel = musicResult;
      // }, 3000);       
    });
  }

}
