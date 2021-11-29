import { SubmitListComponent } from './components/submit/submit-list/submit-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserCreateUpdateComponent } from './components/user/user-create-update/user-create-update.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { MusicUpdateComponent } from './components/music/music-update/music-update.component';
import { MusicHomeComponent } from './components/music/music-home/music-home.component';
import { MusicCreateComponent } from './components/music/music-create/music-create.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
