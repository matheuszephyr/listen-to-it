import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';

@Injectable({
    providedIn: 'root'
  })
export class Messages {    

    constructor(
        private snackBar: MatSnackBar, 
        private alert: AlertService) {
    }    

    showAlert(type: AlertTypes, text: string){

        console.log(type, text)
        switch(type){
            case AlertTypes.danger : {
                this.alert.danger(text);
                break;
            }
            case AlertTypes.info : {
                this.alert.info(text);
                break;
            }
            case AlertTypes.sucess : {
                this.alert.success(text);
                break;
            }
            case AlertTypes.warning : {
                this.alert.warning(text);
                break;
            }
            default : {
                this.alert.danger("Falha interna ao exibir alerta!");
                break;
            }            
        }        
    }

    showMessage(msg: string): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
        })
    }    
}

export enum AlertTypes{
    close,
    danger,
    info,
    sucess,
    warning
}