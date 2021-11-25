import { MusicComentary } from './../comentary.model';
import { ComentaryService } from './../../services/comentary.service';
import { Component, Input, OnInit } from '@angular/core';

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

    console.log(this.idMusic)
    this.comentaryService.listComentary(this.idMusic).subscribe({
      next: (resp) => {
        console.log(resp)
        this.comentaryList = resp;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log("completed");
      }
    });

  }

}
