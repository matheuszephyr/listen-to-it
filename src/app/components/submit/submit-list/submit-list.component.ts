import { SubmitService } from './../../services/submit.service';
import { Component, OnInit } from '@angular/core';
import { AlertTypes, Messages } from '../../util/messages';
import { Submit } from '../submit.model';


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
    private message: Messages
  ) { }

  ngOnInit(): void {

    this.submitService.listSubmits().subscribe({
      next: (resp) => {
        console.log(resp)
        this.submitList = resp;
      },
      error: (error) => {
        this.message.showAlert(AlertTypes.danger, "Falha ao listar envios!")
        console.log(error);
      }
    });

  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
