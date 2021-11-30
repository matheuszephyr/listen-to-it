import { Music } from './../music.model';
import { MusicService } from './../../services/music.service';
import { SubmitService } from './../../services/submit.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Submit, SubmitStatus, SubmitType } from '../../submit/submit.model';
import { AlertTypes, Messages } from '../../util/messages';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-music-update',
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MusicUpdateComponent implements OnInit {

  musicForm: FormGroup = new FormGroup({
    musicName: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    spotifyLink: new FormControl('', [Validators.maxLength(300)]),
    youtubeLink: new FormControl('', [Validators.maxLength(300)])
  });;

  musicSubmitTemplate: Submit = {
    idUser: 0,
    submitType: SubmitType[SubmitType.Music],
    musicName: null,
    artistName: null,
    spotifyCode: null,
    youtubeCode: null,
    isUpdate: true,
    createdAt: new Date,
    status: SubmitStatus[SubmitStatus.Analise],
  };

  musicModel: Music = {
    commentCount: 0,
    haveLyrics: false,
    idArtist: 0,
    likeCount: 0,
    userLiked: false,
    musicName: null,
    artistName: null,
    spotifyCode: null,
    youtubeCode: null,
    createdAt: new Date,
  }

  idMusic: number;

  loged = false;

  constructor(
    private router: Router,
    private messages: Messages,
    private submitService: SubmitService,
    private musicService: MusicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.idMusic = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    this.loged = this.submitService.loged();

    this.musicService.getMusicById(this.idMusic).subscribe({
      next: (result) => {

        this.musicModel.id = result.id;
        this.musicModel.musicName = result.musicName;
        this.musicModel.youtubeCode = `https://www.youtube.com/watch?v=${result.youtubeCode}`;
        this.musicModel.spotifyCode = `https://open.spotify.com/track/${result.spotifyCode}`;

        this.musicForm = new FormGroup({
          musicName: new FormControl(this.musicModel.musicName, [Validators.required, Validators.maxLength(120)]),
          spotifyLink: new FormControl(this.musicModel.spotifyCode, [Validators.maxLength(300)]),
          youtubeLink: new FormControl(this.musicModel.youtubeCode, [Validators.maxLength(300)])
        });

      },
      error: (error) => {
        this.messages.showAlert(AlertTypes.danger, "Falha ao encontrar música!")
        console.log(error);
      }
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.musicForm.controls[controlName].hasError(errorName);
  }

  public createMusicSubmit(musicFormValue: any){

    this.musicSubmitTemplate.idMusic = this.idMusic;
    this.musicSubmitTemplate.idUser = this.submitService.getUserId();
    this.musicSubmitTemplate.musicName = musicFormValue.musicName;
    this.musicSubmitTemplate.spotifyCode = this.submitService.validExternalCode(musicFormValue.spotifyLink, "https://open.spotify.com/track/");
    this.musicSubmitTemplate.youtubeCode = this.submitService.validExternalCode(musicFormValue.youtubeLink, "https://www.youtube.com/watch?v=");

    console.log(this.musicSubmitTemplate);

    if(this.musicSubmitTemplate.spotifyCode == "invalid" || this.musicSubmitTemplate.youtubeCode == "invalid"){
      this.messages.showAlert(AlertTypes.warning, "Um dos links enviados não é válido!")
      return;
    }

    this.submitService.insertSubmit(this.musicSubmitTemplate).subscribe({
      next: (resp) => {
        this.messages.showAlert(AlertTypes.sucess, 'Revisão enviada com sucesso!');
        this.router.navigate(['/music'])
      },
      error: (error) => {
        this.messages.showAlert(AlertTypes.danger, 'Falha ao realizar envio. Tente novamente mais tarde!');
        console.log(error);
      }
    });
  }

}
