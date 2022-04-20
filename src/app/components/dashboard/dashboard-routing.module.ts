import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';

const routes: Routes = [
  { path: '', component: ListCuestionariosComponent, },
  { path: 'crear-quizz', component: CrearQuizzComponent, },
  { path: 'crear-preguntas', component: CrearPreguntasComponent, },
  { path: 'ver-cuestionario/:id', component:  VerCuestionarioComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
