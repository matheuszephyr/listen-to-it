import { UserCollaboration } from './../../shared/collaboration.model';
import { CollaborationService } from './../../services/collaboration.service';
import { SubmitStatus, SubmitType } from './../submit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubmitService } from './../../services/submit.service';
import { Component, OnInit } from '@angular/core';
import { Submit } from '../submit.model';
import { AlertTypes, Messages } from './../../util/messages';
import { UserType } from '../../user/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { Music } from '../../music/music.model'


@Component({
  selector: 'app-submit-read',
  templateUrl: './submit-read.component.html',
  styleUrls: ['./submit-read.component.scss']
})
export class SubmitReadComponent implements OnInit {

  submitModel: Submit = {
    idUser: 0,
    createdAt: new Date,
    isUpdate: false,
    status: "Carregando...",
    submitType: "Carregando...",
    albumName: null,
    albumYear: null,
    artistName: null,
    lyricsLanguage: null,
    lyricsText: null,
    musicName: null,
    spotifyCode: null,
    youtubeCode: null
  };

  enableButtons = true;
  submitForm: FormGroup;
  idSubmit: number = 0;
  userAdmin = false;

  constructor(
    private submitService: SubmitService,
    private router: Router,
    private route: ActivatedRoute,
    private message: Messages,
    private musicService: MusicService,
    private collaborationService: CollaborationService 
  ) { }

  ngOnInit(): void {
    this.idSubmit = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    let _userType = this.submitService.getUserType();
    this.userAdmin = _userType == UserType.Admin;

    this.submitForm = new FormGroup({
      isUpdate: new FormControl(false),
      submitStatus: new FormControl(SubmitStatus[SubmitStatus.Analise]),
      submitType: new FormControl(SubmitType[SubmitType.Music]),
      albumName: new FormControl(null),
      albumYear: new FormControl(null),
      artistName: new FormControl(null),
      lyricsLanguage: new FormControl(null),
      lyricsText: new FormControl(null),
      musicName: new FormControl(null),
      spotifyCode: new FormControl(null),
      youtubeCode: new FormControl(null)
    });

    this.submitService.getSubmitById(this.idSubmit).subscribe({
      next: (result) => {

        this.submitForm = new FormGroup({
          isUpdate: new FormControl(result.isUpdate),
          submitStatus: new FormControl(SubmitStatus[result.status]),
          submitType: new FormControl(SubmitType[result.submitType]),
          albumName: new FormControl(result.albumName),
          albumYear: new FormControl(result.albumYear),
          artistName: new FormControl(result.artistName),
          lyricsLanguage: new FormControl(result.lyricsLanguage),
          lyricsText: new FormControl(result.lyricsText),
          musicName: new FormControl(result.musicName),
          spotifyCode: new FormControl(result.spotifyCode),
          youtubeCode: new FormControl(result.youtubeCode)
        });

        this.submitModel = result;

        this.enableButtons = this.submitModel.status == SubmitStatus[SubmitStatus.Analise]
      },
      error: (error) => {
        this.message.showAlert(AlertTypes.danger, "Falha ao buscar envio!")
        console.log(error);
      }
    })
  }

  rejectSubmit() {
    this.submitModel.status = SubmitStatus[SubmitStatus.Recusado]

    console.log(this.submitModel);

    this.submitService.updateSubmit(this.submitModel).subscribe({
      next: (result) => {
        console.log(result)
        if (result != null && result != undefined) {
          this.message.showAlert(AlertTypes.sucess, "Envio rejeitado com sucesso!");
          return;
        }
      },
      error: (error) => {
        this.message.showAlert(AlertTypes.danger, "Falha ao rejeitar envio!");
        console.log(error)
      },
    });
  }

  aproveSubmit(submitFormValue: any) {

    try{
      switch (this.submitModel.submitType) {

        case SubmitType[SubmitType.Music]: {

          let mus: Music = {
            id: this.submitModel.idMusic,
            musicName: submitFormValue.musicName,
            spotifyCode: submitFormValue.spotifyCode,
            youtubeCode: submitFormValue.youtubeCode,
          }

          this.processMusic(mus, this.submitModel.idUser)
        }
  
  
  
      }
    }
    catch(error){
      this.message.showAlert(AlertTypes.danger, "Falha ao processar envio!");
    }
    
  }

  private processMusic(music: Music, idUser = 0): any {

    if(music.id > 0){     
      
      this.musicService.updateMusic(music).subscribe({
        next: (result) => {
          if(result != null){

            let userCollaboration: UserCollaboration = {
              idUser: idUser,
              idMusic: music.id,
              createdAt: new Date
            }

            this.collaborationService.insertCollaboration(userCollaboration).subscribe({
              next: (result) => {
                console.log(result)
              },
              error: (error) => {
                console.error(error)
              }
            })

            return true;
          }
        },
        error: (error) => {
          console.error(error)
          return false;
        }
      })
    }

  }

}
