import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AutorService } from '../../services/autor.service';
import { Subscription } from 'rxjs';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-autor-form-page',
  templateUrl: './autor-form-page.component.html',
})
export class AutorFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  autorForm!: FormGroup

  subscription = new Subscription()

  createMode: boolean = false;
  editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
  ) { }

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
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    this.autorForm = this.formBuilder.group({
      nome: 'Nome qualquer',
      genero: 'F',
      dataNascimento: '1970-01-01',
      biografia: 'Biografia qualquer'
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    console.log(this.autorForm.value);

    this.subscription.add(
      this.autorService.save(this.autorForm.value).subscribe(
        () => {
          this.router.navigate(['./autores'])
        },
        () => {

        }
      )
    )
  }

  cancel(): void {
    this.router.navigate(['./autores'])
  }


}
