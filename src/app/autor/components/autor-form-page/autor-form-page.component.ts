import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AutorService } from '../../services/autor.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { NacionalidadeInterface } from '../../types/nacionalidade.interface';
import { NacionalidadeService } from '../../services/nacionalidade.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-autor-form-page',
  templateUrl: './autor-form-page.component.html',
})
export class AutorFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  autorForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number
  nacionalidades: NacionalidadeInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private alertController: AlertController,
    private nacionalidadeService: NacionalidadeService,
    private loadingService: LoadingService,
  ) {
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadNacionalidades();
    this.loadAutorOnEditMode()
  }

  private async loadNacionalidades() {
    this.loadingService.on();
    this.subscription.add(
      this.nacionalidadeService.getNacionalidades().subscribe((response) => {
        this.nacionalidades = response;
        this.loadingService.off();
      })
    );
  }

  private loadAutorOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.autorService.getAutor(this.id).subscribe((autor) => {
          this.autorForm.patchValue({
            nome: autor.nome,
            genero: autor.genero,
            dataNascimento: autor.dataNascimento,
            biografia: autor.biografia,
            nacionalidade: autor.nacionalidade,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.autorForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeAutorTeste(),
        ]
      ],
      genero: 'F',
      dataNascimento: '1970-01-01',
      biografia: ['Biografia qualquer', Validators.required],
      nacionalidade: '',
    })
  }

  validaNomeAutorTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'teste') {
        return { invalidName: 'teste' }
      }
      if (value.includes('xyz')) {
        return { invalidName: 'xyz' }
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.autorService.save(this.autorForm.value).subscribe(
          () => {
            this.router.navigate(['./autores'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do autor',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.autorService.update({
        ...this.autorForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./autores'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do autor',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./autores'])
  }

  compareWith(o1: NacionalidadeInterface, o2: NacionalidadeInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


}
