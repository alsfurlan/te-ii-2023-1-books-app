import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import {  Subscription } from 'rxjs';
import { LivroService } from '../../services/livro.service';
import { LivroInterface } from '../../types/livro.interface';

@Component({
  selector: 'app-livro-list-page',
  templateUrl: './livro-list-page.component.html',
})
export class LivroListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  livros: LivroInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private livroService: LivroService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.livros = [];
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

    const subscription = this.livroService.getLivros()
      .subscribe(async (livros) => {
        this.livros = livros;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de livroes carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de livroes',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }
}
