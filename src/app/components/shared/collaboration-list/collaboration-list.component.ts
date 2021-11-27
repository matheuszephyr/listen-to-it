import { CollaborationService } from './../../services/collaboration.service';
import { CollaborationFilter, UserCollaboration } from './../collaboration.model';
import { Component, Injectable, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaboration-list',
  templateUrl: './collaboration-list.component.html',
  styleUrls: ['./collaboration-list.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CollaborationListComponent implements OnChanges {

  @Input() collaborationFilter: CollaborationFilter = {};

  @Input() idMusic: number = 0;
  @Input() idArtist: number = 0;
  @Input() idAlbum: number = 0;
  @Input() idLyrics: number = 0;

  collaborationView: UserCollaboration[] = [];

  constructor(private collaborationService: CollaborationService) { }

  ngOnChanges(): void {

    this.collaborationFilter.idMusic = this.idMusic;
    this.collaborationFilter.idArtist = this.idArtist;
    this.collaborationFilter.idAlbum = this.idAlbum;
    this.collaborationFilter.idLyrics = this.idLyrics;

    this.collaborationService.listCollaboration(this.collaborationFilter).subscribe({
      next: (resp) => {
        this.collaborationView = resp;
      },
      error: (error) => {
        this.collaborationView = [];
        console.log(error);
      },
      complete: () => {
      }
    });
  }
  
  updateCollaborationView(filter: CollaborationFilter){
    this.collaborationService.listCollaboration(filter).subscribe({
      next: (resp) => {
        this.collaborationView = resp;
      },
      error: (error) => {
        this.collaborationView = [];
        console.log(error);
      },
      complete: () => {
      }
    });
  }

}
