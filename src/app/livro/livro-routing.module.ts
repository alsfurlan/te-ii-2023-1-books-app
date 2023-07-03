import { LivroFormPageComponent } from './components/livro-form-page/livro-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LivroListPageComponent } from './components/livro-list-page/livro-list-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: LivroListPageComponent,
  },
  {
    path: 'cadastro',
    component: LivroFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
