import { ServiceResponse } from './../../services/service.model';
import { UserType } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertTypes, Messages } from './../../util/messages';
import { User } from '../user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  userUpdate: User = {
    id: null,
    email: "",
    image: "",
    passwordHash: "",
    userName: "",
    userScore: 0,
    userType: UserType[UserType.User],
    createdAt: new Date
  };
  userUpdateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private message: Messages
  ) { }

  ngOnInit(): void {

    this.userUpdate.id = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "");

    this.userUpdateForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      passwordRepeat: new FormControl('', [Validators.required, Validators.maxLength(100)])
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userUpdateForm.controls[controlName].hasError(errorName);
  }

  public validPasswordRepeat() {
    return this.userUpdateForm.controls["password"].value != this.userUpdateForm.controls["passwordRepeat"].value;
  }

  saveUser(userFormValue: any): void {
    
    if(this.validPasswordRepeat()){
      this.message.showAlert(AlertTypes.warning, "As senhas informadas devem ser identicas!");
      return;
    }

    if (this.userUpdateForm.valid && !this.validPasswordRepeat()) {

      this.userUpdate.userName = userFormValue.userName
      this.userUpdate.email = userFormValue.email
      this.userUpdate.passwordHash = btoa(userFormValue.password)

      this.userService.insertUser(this.userUpdate).subscribe({
        next: (resp) => {
          this.message.showAlert(AlertTypes.sucess, "Usuário criado com sucesso!");
          this.router.navigate(["/user/login"]);
        },
        error: (error) => {
          this.message.showAlert(AlertTypes.danger, "Falha ao salvar dados. Tente novamente mais tarde!");
        },
        complete: () => { }
      });
    }
    else
    {
      this.message.showAlert(AlertTypes.warning, "Alguns campos ainda contém dados inválidos!");
    }

  }

}
