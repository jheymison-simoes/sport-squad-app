import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  logoSrc = "../../../../assets/images/mr-logo.png"

  constructor() { }
  ngOnInit(): void {
  }

}
