import { SubmitStatus, SubmitType } from './../../submit/submit.model';
import { SubmitService } from './../../services/submit.service';
import { Album } from './../album.model';
import { AlbumService } from './../../services/album.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertTypes, Messages } from '../../util/messages';
import { Submit } from '../../submit/submit.model';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.scss']
})
export class AlbumCreateComponent implements OnInit {

  loged: boolean = false;
  albumForm: FormGroup;
  newAlbum: Album = {
    albumName: null,
    albumYear: null,
    idArtist: 0,
    spotifyCode: null,
    artistName: null,
    createdAt: new Date
  };

  idArtist: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messages: Messages,
    private submitService: SubmitService
  ) { }

  ngOnInit(): void {

    this.idArtist = Number.parseInt(this.route.snapshot.paramMap.get('idArtist') ?? "0");

    if (!(this.idArtist > 0)) {
      this.messages.showAlert(AlertTypes.danger, "Artista inválido!")
      return;
    }

    this.loged = this.submitService.loged();

    this.albumForm = new FormGroup({
      albumName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      albumYear: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      spotifyLink: new FormControl(null, [Validators.required, Validators.maxLength(150)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.albumForm.controls[controlName].hasError(errorName);
  }

  createAlbumSubmit(albumFormValue: any) {
    if (this.albumForm.valid) {

      let submitAlbum: Submit = {
        idUser: this.submitService.getUserId(),
        idArtist: this.idArtist,
        albumName: albumFormValue.albumName,
        albumYear: albumFormValue.albumYear,
        spotifyCode: this.submitService.validExternalCode(albumFormValue.spotifyLink, "https://open.spotify.com/album/"),
        isUpdate: false,
        status: SubmitStatus[SubmitStatus.Analise],
        submitType: SubmitType[SubmitType.Album],
        createdAt: new Date
      } 

      if (submitAlbum.spotifyCode == "invalid") {
        this.messages.showAlert(AlertTypes.warning, "Link do Spotify inválido!")
        return;
      }

      this.submitService.insertSubmit(submitAlbum).subscribe({
        next: (resp) => {
          this.messages.showAlert(AlertTypes.sucess, 'Álbum enviado com sucesso!');
          this.router.navigate(['/album']);
        },
        error: (error) => {
          this.messages.showAlert(AlertTypes.danger, 'Falha ao realizar envio. Tente novamente mais tarde!');
          console.log(error);
        }
      });
    }
  }  

}
