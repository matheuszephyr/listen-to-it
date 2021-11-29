import { UserService } from './../../services/user.service';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userModel: User = {
    id: 0,
    email: "Carregando...",
    image: "Carregando...",
    userName: "Carregando...",
    userScore: 0,
    userType: "Carregando...",
    passwordHash: "",    
    createdAt: new Date
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {

    let idUser = this.userService.getUserId();

    if(idUser > 0){
      this.userService.getUserById(idUser).subscribe({
        next: (result) => {
          this.userModel = result;
        },
        complete: () => {},
        error: (error) => { console.log(error) }
      });
    }

  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['user/login'])
  }

}
