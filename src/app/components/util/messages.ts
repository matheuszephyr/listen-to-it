import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Messages {    

    constructor(private snackBar: MatSnackBar) {
    }

    showMessage(msg: string): void {
        console.log(msg);
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
        })
    }

    
}