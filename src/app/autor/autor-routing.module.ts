import { AutorFormPageComponent } from './components/autor-form-page/autor-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AutorListPageComponent } from './components/autor-list-page/autor-list-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: AutorListPageComponent,
  },
  {
    path: 'cadastro',
    component: AutorFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: AutorFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorRoutingModule {}
