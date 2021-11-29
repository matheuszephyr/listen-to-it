import { User } from './../user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertTypes, Messages } from '../../util/messages';
import { UserService } from '../../services/user.service';
import { ResponseCode } from '../../services/service.model';

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
    private message: Messages, 
    private userService: UserService
    ) { }  

  ngOnInit(): void {
    this.loged = this.userService.loged();    
  }  


  public login = (formLoginValue: any) => {
    if(this.formLogin.valid){
      this.load = true;

      let user = {
        email: formLoginValue.email,
        password: formLoginValue.password
      }

      this.userService.login(user, false).then((resp) => {
        console.log(resp)
        if(resp.statusCode == ResponseCode.OK){
          this.message.showAlert(AlertTypes.sucess, "Login efetuado com sucesso!");
          this.loged = true;   
          this.load = false;       
        }
        else{
          this.message.showAlert(AlertTypes.danger, "Usuário ou senha incorretos.");
        }
      }).catch((error) => {
        this.message.showAlert(AlertTypes.danger, "Falha ao realizar login!")
      }).finally(() => {
        this.load = false;
      });
    }
  }  

  public logOutUser(){
    this.userService.logOut();  
    this.loged = false;
    this.message.showAlert(AlertTypes.sucess, "Sessão finalizada com sucesso!");
  }

}
