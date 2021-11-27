import { User } from './../user.model';
import { UserService } from './../user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  load = false;
  loged = false;

  constructor(
    private alert: AlertService, 
    private userService: UserService
    ) { }  

  ngOnInit(): void {
    this.loged = this.userService.loged();
  }  


  public login = (formLoginValue: any) => {
    if(this.formLogin.valid){
      this.executeLogin(formLoginValue.email, formLoginValue.password);
    }
  }

  private executeLogin(email: string, password: string){
    this.load = true;
    password = btoa(password);

    this.userService.login(email,password).subscribe({
      next: (resp) => this.loginUser(resp),
      error: (error) => this.alert.danger("Falha ao realizar login. Tente novamente mais tarde!"),
      complete: () => this.load = false
    });     
  }

  private loginUser(user: User[]){

    if(user != null && user.length > 0){
      this.userService.generateUserToken(user[0]);
      this.alert.success("Login efetuado com sucesso!");
      this.loged = true;
    }
    else{
      this.alert.danger("Usuário ou senha incorretos.");
    }
    
  }

  public logOutUser(){
    this.userService.resetToken();
    window.location.reload();
  }

}
