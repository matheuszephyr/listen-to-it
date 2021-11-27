import { UserService } from './../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from './../music.model';
import { MusicService } from './../music.service';
import { Component, OnInit } from '@angular/core';
import { AlertTypes, Messages } from '../../util/messages';

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

  actionLayout = {
    likeStatus: "unliked"
  }

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private message: Messages
  ) { }

  ngOnInit(): void {
    this.idMusic = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "");
    this.userLoged = this.userService.loged();

    this.musicService.getMusicById(this.idMusic).subscribe(musicResult => {

      this.musicModel = musicResult;
      this.actionLayout.likeStatus = this.musicModel.userLiked ? "liked" : "unliked";

      //SETA O LINK DOS IFRAMES
      if (this.musicModel.youtubeCode.length > 0) {
        let youtubeFrame = document.getElementById('youtubeframe');
        youtubeFrame.setAttribute('src', 'https://www.youtube.com/embed/' + this.musicModel.youtubeCode);
      }
      if (this.musicModel.spotifyCode.length > 0) {
        let spotifyFrame = document.getElementById('spotifyframe');
        spotifyFrame.setAttribute('src', 'https://open.spotify.com/embed/track/' + this.musicModel.spotifyCode);
      }     
      
    });
  }

  likeMusic(userLiked: boolean){ 
    console.log(this.userLoged);
    if(!this.userLoged)
      this.message.showAlert(AlertTypes.warning, "Você precisa realizar login para curtir!")
  

    if(userLiked){
      this.musicModel.likeCount --;
      this.actionLayout.likeStatus = "unliked"
      this.musicModel.userLiked = false;
    }   
    else{
      this.musicModel.likeCount ++;
      this.actionLayout.likeStatus = "liked"
      this.musicModel.userLiked = true;
    }
    
  }

}
