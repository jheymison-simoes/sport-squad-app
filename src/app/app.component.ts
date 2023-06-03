import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') className= 'darkMode';

  ngOnInit(): void {
    this.className = 'darkMode';
  }
}
