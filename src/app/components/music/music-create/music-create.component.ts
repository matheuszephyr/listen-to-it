import { UserService } from './../../user/user.service';
import { SubmitService } from './../../submit/submit.service';
import { Messages } from './../../util/messages';
import { Router } from '@angular/router';
import { Music, MusicSubmit } from './../music.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MusicCreateComponent implements OnInit {

  musicForm!: FormGroup;

  musicTemplate: Music = {
    name: "",
    artistName: "",
    spotifyLink: "",
    youtubeLink: "",
    albumName: "",
    commentCount: 0,
    haveLyrics: false,
    idAlbum: 0,
    idArtist: 0,
    likeCount: 0,
    userLiked: false,    
    createdAt: new Date
  };

  musicSubmitTemplate: MusicSubmit = {
    idUser: 2,
    lyrics: "",
    lyricsLanguage: "",
    submitType: "",
    update: false,
    musicName: "",
    artistName: "",
    spotifyLink: "",
    youtubeLink: "",
    albumName: "",
    officialLink: "",
    idAlbum: 0,
    createdAt: new Date
  };  

  loged = false;

  constructor(
    private router: Router,
    private messages: Messages,
    private submitService: SubmitService,
    private userService: UserService
    ) { }

  ngOnInit(): void {

    const regexUrl = "/^(http[s])/";    

    this.loged = this.userService.loged();

    this.musicForm = new FormGroup({
      musicName: new FormControl('',[Validators.required, Validators.maxLength(120)]),
      artistName: new FormControl('',[Validators.required, Validators.maxLength(120)]),
      spotifyLink: new FormControl('',[Validators.required, Validators.maxLength(300)]),
      youtubeLink: new FormControl('',[Validators.maxLength(300)])
    });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.musicForm.controls[controlName].hasError(errorName);
  }

  public createMusicSubmit = (musicFormValue: any) => {
    if (this.musicForm.valid) {
      this.executeMusicSubmit(musicFormValue);
    }
  }

  private executeMusicSubmit(musicFormValue: any): void{

    this.musicSubmitTemplate.musicName = musicFormValue.musicName;
    this.musicSubmitTemplate.artistName = musicFormValue.artistName;
    this.musicSubmitTemplate.spotifyLink = musicFormValue.spotifyLink;
    this.musicSubmitTemplate.youtubeLink = musicFormValue.youtubeLink;

    this.submitService.insertSubmit(this.musicSubmitTemplate).subscribe(() => {
      this.messages.showMessage('Musica Enviada!');
      this.router.navigate(['/music'])
    });

    this.messages.showMessage('sucesoo mlk!!!');
  }  

}
