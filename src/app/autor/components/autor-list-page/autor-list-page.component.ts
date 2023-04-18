import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AutorService } from '../../services/autor.service';
import { AutorInterface } from '../../types/autor.interface';

@Component({
  selector: 'app-autor-list-page',
  templateUrl: './autor-list-page.component.html',
})
export class AutorListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  autores: AutorInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private autorService: AutorService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.autores = [];
  }

  ionViewWillEnter(): void {
    this.listar();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.autorService.getAutores()
      .subscribe(async (autores) => {
        this.autores = autores;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de autores carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de autores',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(autor: AutorInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${autor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.autorService.remove(autor).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  favorite(autor: AutorInterface) {
    const autoresFavoritesLocalStorage = window.localStorage.getItem('autoresFavoritos');
    let arrayAutoresFavoritos = autoresFavoritesLocalStorage ? JSON.parse(autoresFavoritesLocalStorage) : [];

    const contain = arrayAutoresFavoritos.some((a: AutorInterface) => a.id === autor.id);
    arrayAutoresFavoritos = contain ? arrayAutoresFavoritos : [...arrayAutoresFavoritos, autor]

    window.localStorage.setItem('autoresFavoritos', JSON.stringify(arrayAutoresFavoritos))
  }
}
