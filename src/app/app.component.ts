import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./shared/services/localStorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(){}

  ngOnInit() {
  }

}

