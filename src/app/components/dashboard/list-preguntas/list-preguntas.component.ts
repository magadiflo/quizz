import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';
import { Pregunta } from '../../../models/pregunta.model';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {

  listaPreguntas: Pregunta[] = [];

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {
    this.quizzService.getPreguntas()
      .subscribe(pregunta => {
        this.listaPreguntas.push(pregunta);
        console.log(this.listaPreguntas);
      });
  }

}
