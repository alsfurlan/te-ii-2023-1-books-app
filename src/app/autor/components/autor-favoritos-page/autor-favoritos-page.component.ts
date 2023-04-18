import { Component, OnInit } from "@angular/core";
import { AutorInterface } from "../../types/autor.interface";

@Component({
  selector: 'app-autor-favoritos-page',
  templateUrl: './autor-favoritos-page.component.html',
})
export class AutorFavoritosPageComponent implements OnInit {

  autores: AutorInterface[] = []

  ngOnInit(): void {
    const autoresFavoritesLocalStorage = window.localStorage.getItem('autoresFavoritos')
    this.autores = autoresFavoritesLocalStorage ? JSON.parse(autoresFavoritesLocalStorage) : [];
  }

  unfavorite(autor: AutorInterface) {
    this.autores = this.autores.filter(a => a.id !== autor.id);
    window.localStorage.setItem('autoresFavoritos', JSON.stringify(this.autores));
  }
}
