import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroFormPageComponent } from './components/livro-form-page/livro-form-page.component';
import { LivroListPageComponent } from './components/livro-list-page/livro-list-page.component';
import { LivroService } from './services/livro.service';
import { AutorModule } from '../autor/autor.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    LivroRoutingModule,
    AutorModule,
  ],
  declarations: [
    LivroListPageComponent,
    LivroFormPageComponent,
  ],
  providers: [LivroService],
})
export class LivroModule {}
