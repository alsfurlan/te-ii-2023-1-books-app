import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Livros', url: '/livros', icon: 'book' },
    { title: 'Autores', url: '/autores', icon: 'people-circle' },
    { title: 'Autores Favoritos', url: '/autores/favoritos', icon: 'heart' },
  ];
  constructor() {}
}
