import { MusicComentary } from './../comentary.model';
import { ComentaryService } from './../../services/comentary.service';
import { Component, Input, OnInit } from '@angular/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { isNullOrUndefined } from '../../util/validations';

@Component({
  selector: 'app-music-comentary',
  templateUrl: './music-comentary.component.html',
  styleUrls: ['./music-comentary.component.scss']
})
export class MusicComentaryComponent implements OnInit {

  @Input() idMusic: number = 0;

  comentaryList: MusicComentary[] = [];
  
  constructor(private comentaryService: ComentaryService) { }

  ngOnInit(): void {

    this.comentaryService.listComentary(this.idMusic).subscribe({
      next: (resp) => {
        this.comentaryList = resp;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
      }
    });

  }

  haveComent(){
    return !isNullOrUndefined(this.comentaryList) && this.comentaryList.length > 0;
  }

}
