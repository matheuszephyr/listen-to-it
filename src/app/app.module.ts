import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MODULOAS DA APLICACAO
import { HeaderComponent } from './components/template/header/header.component';

//DEPENDENCIAS
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//MODULOS MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//MODULOS DE TERCEIROS
import { AlertModule } from '@full-fledged/alerts';

import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MusicHomeComponent } from './components/music/music-home/music-home.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';
import { MusicCreateComponent } from './components/music/music-create/music-create.component';
import { MusicUpdateComponent } from './components/music/music-update/music-update.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { SubmitListComponent } from './components/submit/submit-list/submit-list.component';
import { LoadingComponent } from './components/template/loading/loading.component';
import { LyricsListComponent } from './components/lyrics/lyrics-list/lyrics-list.component';
import { MusicComentaryComponent } from './components/music/music-comentary/music-comentary.component';
import { CollaborationListComponent } from './components/shared/collaboration-list/collaboration-list.component';
import { MessagesPipe } from './components/util/messages.pipe';
import { UserCreateUpdateComponent } from './components/user/user-create-update/user-create-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    MusicHomeComponent,
    MusicListComponent,
    MusicCreateComponent,
    MusicUpdateComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserUpdateComponent,
    SubmitListComponent,
    LoadingComponent,
    LyricsListComponent,
    MusicComentaryComponent,
    CollaborationListComponent,
    MessagesPipe,
    UserCreateUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    //MATERIAL
    MatToolbarModule, 
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,    
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionY: "top"})
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
 }
