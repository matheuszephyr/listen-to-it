import { SubmitStatus } from './../../submit/submit.model';
import { AlertTypes, Messages } from './../../util/messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Submit, SubmitType } from '../../submit/submit.model';
import { SubmitService } from '../../services/submit.service';


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

  musicSubmitTemplate: Submit = {
    idUser: 0,
    submitType: SubmitType[SubmitType.Music],
    musicName: "",
    artistName: "",
    spotifyCode: "",
    youtubeCode: "",
    isUpdate: false,
    createdAt: new Date,
    status: SubmitStatus[SubmitStatus.Analise],
  };

  loged = false;

  constructor(
    private router: Router,
    private messages: Messages,
    private submitService: SubmitService,
  ) { }

  ngOnInit(): void {

    const regexUrl = "/^(http[s])/";

    this.loged = this.submitService.loged();

    this.musicForm = new FormGroup({
      musicName: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      artistName: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      spotifyLink: new FormControl('', [Validators.maxLength(300)]),
      youtubeLink: new FormControl('', [Validators.maxLength(300)])
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.musicForm.controls[controlName].hasError(errorName);
  }

  public createMusicSubmit = (musicFormValue: any) => {
    if (this.musicForm.valid) {
      this.executeMusicSubmit(musicFormValue);
    }
  }

  private executeMusicSubmit(musicFormValue: any): void {

    this.musicSubmitTemplate.idUser = this.submitService.getUserId();
    this.musicSubmitTemplate.musicName = musicFormValue.musicName;
    this.musicSubmitTemplate.artistName = musicFormValue.artistName;
    this.musicSubmitTemplate.spotifyCode = this.submitService.validExternalCode(musicFormValue.spotifyLink, "https://open.spotify.com/track/");
    this.musicSubmitTemplate.youtubeCode = this.submitService.validExternalCode(musicFormValue.youtubeLink, "https://www.youtube.com/watch?v=");

    if(this.musicSubmitTemplate.spotifyCode == "invalid" || this.musicSubmitTemplate.youtubeCode == "invalid"){
      this.messages.showAlert(AlertTypes.warning, "Um dos links enviados não é válido!")
      return;
    }

    this.submitService.insertSubmit(this.musicSubmitTemplate).subscribe({
      next: (resp) => {
        this.messages.showAlert(AlertTypes.sucess, 'Música enviada com sucesso!');
        this.router.navigate(['/music'])
      },
      error: (error) => {
        this.messages.showAlert(AlertTypes.danger, 'Falha ao realizar envio. Tente novamente mais tarde!');
        console.log(error);
      }
    });

  }  

}
