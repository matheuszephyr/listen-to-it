import { ArtistService } from './../../services/artist.service';
import { Artist } from './../artist.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../../util/messages';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss']
})
export class ArtistHomeComponent implements OnInit {

  idArtist: number = 0;
  artistModel: Artist = {
    id: null,
    artistName: null,
    spotifyCode: null,
    officialLink: null,
    createdAt: new Date
  };
  loged = false;

  actionLayout = {
    likeStatus: "unliked"
  };

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute,
    private message: Messages
    ) { }

  ngOnInit(): void {
    this.idArtist = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    this.loged = this.artistService.loged();

    this.artistService.getArtistById(this.idArtist).subscribe({
      next: (result) => {
        this.artistModel = result;

        if (this.artistModel.spotifyCode != null) {
          let spotifyFrame = document.getElementById('spotifyframe');
          spotifyFrame.setAttribute('src', 'https://open.spotify.com/follow/1/?uri=spotify:artist:' + this.artistModel.spotifyCode + '&size=detail&theme=dark');
        }
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

}
