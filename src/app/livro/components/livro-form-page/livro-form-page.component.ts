import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Subscription } from 'rxjs';
import {
  AlertController,
  LoadingController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AutorService } from 'src/app/autor/services/autor.service';
import { AutorInterface } from 'src/app/autor/types/autor.interface';

@Component({
  selector: 'app-livro-form-page',
  templateUrl: './livro-form-page.component.html',
})
export class LivroFormPageComponent
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  livroForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id: string | null = null;
  autores: AutorInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private livroService: LivroService,
    private alertController: AlertController,
    private autorService: AutorService,
    private loadingService: LoadingService
  ) {}

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAutores();
  }

  private async loadAutores() {
    this.loadingService.on();
    this.subscription.add(
      this.autorService.getAutores().subscribe((response) => {
        this.autores = response;
        this.loadingService.off();
      })
    );
  }

  private initializeForm() {
    this.livroForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      subtitulo: ['', Validators.maxLength(100)],
      genero: 'INFANTIL',
      dataLancamento: '1970-01-01',
      autores: [],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.subscription.add(
      this.livroService.add(this.livroForm.value).subscribe({
        next: () => {
          this.router.navigate(['./livros']);
        },
        error: async (response) => {
          const message = response.error?.message;
          const alerta = await this.alertController.create({
            header: 'Erro',
            subHeader: `Não foi possível adicionar o livro`,
            message: message || '',
            buttons: ['Ok'],
          });
          alerta.present();
        },
      })
    );
  }

  cancel(): void {
    this.router.navigate(['./livroes']);
  }

  compareWith(o1: AutorInterface, o2: AutorInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
