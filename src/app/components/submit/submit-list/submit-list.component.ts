import { Router } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { Component, OnInit } from '@angular/core';
import { AlertTypes, Messages } from '../../util/messages';
import { Submit } from '../submit.model';
import { UserType } from '../../user/user.model';


@Component({
  selector: 'app-submit-list',
  templateUrl: './submit-list.component.html',
  styleUrls: ['./submit-list.component.scss']
})
export class SubmitListComponent implements OnInit {

  submitList: Submit[] = [];
  displayedColumns = ["musicName", "artistName", "status", "submitType", "createdAt"];

  constructor(
    private submitService: SubmitService,
    private message: Messages,
    private router: Router
  ) { }

  ngOnInit(): void {

    let filter = null;

    if(this.submitService.getUserType() != UserType.Admin){
      filter = {
        idUser: this.submitService.getUserId()
      } 
    }

    this.submitService.listSubmits(filter).subscribe({
      next: (resp) => {
        this.submitList = resp;
      },
      error: (error) => {
        this.message.showAlert(AlertTypes.danger, "Falha ao listar envios!")
        console.log(error);
      }
    });

  }

  onRowClicked(row) {
    if(this.submitService.getUserType() != UserType.Admin){
      return;
    }

    let url = "/submits/read/" + row.id;
    this.router.navigate([url])
  }

}
