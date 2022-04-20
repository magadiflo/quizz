import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { ContadorInicialComponent } from './contador-inicial/contador-inicial.component';
import { RealizarQuizzComponent } from './realizar-quizz/realizar-quizz.component';

const routes: Routes = [
  { path: '', component: IngresarNombreComponent, },
  { path: 'iniciar-contador', component: ContadorInicialComponent, },
  { path: 'realizar-quizz', component: RealizarQuizzComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugarRoutingModule { }
