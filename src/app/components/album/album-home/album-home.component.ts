import { AlbumService } from './../../services/album.service';
import { Album } from './../album.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../../util/messages';


@Component({
  selector: 'app-album-home',
  templateUrl: './album-home.component.html',
  styleUrls: ['./album-home.component.scss']
})
export class AlbumHomeComponent implements OnInit {

  albumModel: Album = {
    albumName: "Carregando...",
    albumYear: "Carregando...",
    spotifyCode: "Carregando...",
    idArtist: 0,
    createdAt: new Date
  };
  actionLayout = {
    likeStatus: "unliked"
  };

  idAlbum: number = 0;
  loged: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private message: Messages 
  ) { }

  ngOnInit(): void {
    this.idAlbum = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    this.loged = this.albumService.loged();

    this.albumService.getAlbumById(this.idAlbum).subscribe({
      next: (result) => {

        this.albumModel = result;

        if (this.albumModel.spotifyCode != null) {
          let spotifyFrame = document.getElementById('spotifyframe');
          spotifyFrame.setAttribute('src', 'https://open.spotify.com/embed/album/' + this.albumModel.spotifyCode);
        }   
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
