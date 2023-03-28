import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AutorService } from '../../services/autor.service';
import { AutorInterface } from '../../types/autor.interface';

@Component({
  selector: 'app-autor-list-page',
  templateUrl: './autor-list-page.component.html',
})
export class AutorListPageComponent implements OnInit, OnDestroy {
  autores: AutorInterface[] = [];
  subscriptions = new Subscription();

  constructor(private autorService: AutorService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.listar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  listar() {
    const subscription = this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
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
}
