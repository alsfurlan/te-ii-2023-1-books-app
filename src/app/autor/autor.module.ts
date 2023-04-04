import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorFormPageComponent } from './components/autor-form-page/autor-form-page.component';
import { AutorListPageComponent } from './components/autor-list-page/autor-list-page.component';
import { AutorService } from './services/autor.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, AutorRoutingModule],
  declarations: [AutorListPageComponent, AutorFormPageComponent],
  providers: [AutorService],
})
export class AutorModule {}
