import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { MusicUpdateComponent } from './components/music/music-update/music-update.component';
import { MusicHomeComponent } from './components/music/music-home/music-home.component';
import { MusicCreateComponent } from './components/music/music-create/music-create.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: "music/:id",
    component: MusicHomeComponent
  },
  {
    path: "music/update/:id",
    component: MusicUpdateComponent
  },
  {
    path: "user/login",
    component: UserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
