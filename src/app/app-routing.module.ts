import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComidasComponent } from '../app/pages/comidas/comidas.component';
import { ComidaComponent } from '../app/pages/comida/comida.component';


const routes: Routes = [
  {path: 'comidas', component: ComidasComponent},
  {path: 'comida/:id', component: ComidaComponent},
  {path: '**', redirectTo: 'comidas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
