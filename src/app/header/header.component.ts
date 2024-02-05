import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor() {}

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  }
}