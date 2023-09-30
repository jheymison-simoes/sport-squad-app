import {Component, HostBinding, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') className= 'darkMode';

  constructor() {}

  ngOnInit() {
    this.className = 'darkMode';
  }
}
