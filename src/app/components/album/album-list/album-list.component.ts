import { AlbumService } from './../../services/album.service';
import { Album } from './../album.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  albumList: Album[] = [];
  loged: boolean = false;
  

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {

    this.albumService.listAlbums().subscribe({
      next: (result) => {
        this.albumList = result;
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

}
