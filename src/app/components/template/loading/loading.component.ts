import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class LoadingComponent implements OnInit {

  load = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.load = true;
  }

  close() {
    this.load = false;
  }

}
