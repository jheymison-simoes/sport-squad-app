import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent {
  @Input() title: string = 'Não Definido';
  @Input() showBackButton: boolean = false;

  redirectToBack() {
    window.history.back();
  }
}
