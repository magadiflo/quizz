import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizzService } from '../../../services/quizz.service';
import { Pregunta } from '../../../models/pregunta.model';
import { Respuesta } from '../../../models/respuesta.model';
import { Cuestionario } from '../../../models/cuestionario.model';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {

  listaPreguntas: Pregunta[] = [];

  constructor(
    private quizzService: QuizzService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.quizzService.tituloCuestionario === '' || this.quizzService.descripcion === ''){
      this.router.navigate(['/dashboard']);
    }
    this.quizzService.getPreguntas()
      .subscribe(pregunta => {
        this.listaPreguntas.push(pregunta);
      });
  }

  eliminarPregunta(index: number): void {
    this.listaPreguntas.splice(index, 1);
  }

  finalizarCuestionario(): void {
    const cuestionario: Cuestionario = {
      uid: '',
      titulo: this.quizzService.tituloCuestionario,
      descripcion: this.quizzService.descripcion,
      codigo: '',
      cantPreguntas: this.listaPreguntas.length,
      fechaCreacion: new Date(),
      listaPreguntas: this.listaPreguntas,
      id: 1
    }
    console.log(cuestionario);  
  }

  activa(respuesta: Respuesta) {
    return {
      'active text-white': respuesta.esCorrecta === true
    }
  }

}
