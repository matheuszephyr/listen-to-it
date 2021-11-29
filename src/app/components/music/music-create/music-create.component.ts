import { AlertTypes, Messages } from './../../util/messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
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
    this.extractExternalCode("https://www.youtube.com/watch?v=IGxG_EzDHZY&ab_channel=Kauf")

    this.loged = this.userService.loged();

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

    this.musicSubmitTemplate.idUser = this.userService.getUserId();
    this.musicSubmitTemplate.musicName = musicFormValue.musicName;
    this.musicSubmitTemplate.artistName = musicFormValue.artistName;
    this.musicSubmitTemplate.spotifyCode = this.validExternalCode(musicFormValue.spotifyLink, "spotify.com/track");
    this.musicSubmitTemplate.youtubeCode = this.validExternalCode(musicFormValue.youtubeLink, "youtube.com/watch");

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

  private validExternalCode(value: string, codeType: string): string {
    if (value != undefined && value != null && value != "") {
      if (value.includes("https://") || value.includes("http://")) {
        if (value.includes(codeType)) {
          return this.extractExternalCode(value);
        }
      }
      return "invalid";
    }
    else {
      return null;
    }
  }

  //EXTRAI O CODIGO A PARTIR DOS LINKS
  private extractExternalCode(value: string): string {
    if (value.includes("spotify")) {
      value = value.replace("https://open.spotify.com/track/", "");
      let siIndex = value.indexOf("?si=");
      value = value.slice(0, siIndex);
      return value;
    }
    if (value.includes("youtube")) {
      value = value.replace("https://www.youtube.com/watch?v=", "");
      let siIndex = value.indexOf("&");
      value = value.slice(0, siIndex);
      return value;
    }
  }

}
