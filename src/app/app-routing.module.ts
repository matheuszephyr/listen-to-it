import { SubmitReadComponent } from './components/submit/submit-read/submit-read.component';
import { AlbumListComponent } from './components/album/album-list/album-list.component';
import { AlbumUpdateComponent } from './components/album/album-update/album-update.component';
import { AlbumCreateComponent } from './components/album/album-create/album-create.component';
import { AlbumHomeComponent } from './components/album/album-home/album-home.component';
import { SubmitListComponent } from './components/submit/submit-list/submit-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserCreateUpdateComponent } from './components/user/user-create-update/user-create-update.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { MusicHomeComponent } from './components/music/music-home/music-home.component';
import { MusicCreateComponent } from './components/music/music-create/music-create.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistHomeComponent } from './components/artist/artist-home/artist-home.component';
import { MusicUpdateComponent } from './components/music/music-update/music-update.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "music",
    component: MusicListComponent
  },
  {
    path: "music/submit",
    component: MusicCreateComponent
  },
  {
    path: "music/edit/:id",
    component: MusicUpdateComponent
  },
  {
    path: "music/:id",
    component: MusicHomeComponent
  },  
  {
    path: "user/login",
    component: UserLoginComponent
  },
  {
    path: "user/edit",
    component: UserCreateUpdateComponent
  },
  {
    path: "user/profile",
    component: UserProfileComponent
  },
  {
    path: "submits",
    component: SubmitListComponent
  }, 
  {
    path: "submits/read/:id",
    component: SubmitReadComponent
  },  
  {
    path: "album/create/:idArtist",
    component: AlbumCreateComponent
  },
  {
    path: "album/edit",
    component: AlbumUpdateComponent
  },
  {
    path: "album/home/:id",
    component: AlbumHomeComponent
  },
  {
    path: "album",
    component: AlbumListComponent
  },
  {
    path: "artist/home/:id",
    component: ArtistHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
