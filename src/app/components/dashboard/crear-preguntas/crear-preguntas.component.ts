import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {
    console.log(this.quizzService.tituloCuestionario, this.quizzService.descripcion);
  }

}
