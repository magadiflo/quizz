import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    segundos: [10, [Validators.required]],
    puntos: [100, [Validators.required]],
    respuesta1: this.fb.group({
      titulo: ['', [Validators.required]],
      esCorrecto: [false, [Validators.required]],
    }),
    respuesta2: this.fb.group({
      titulo: ['', [Validators.required]],
      esCorrecto: [false, [Validators.required]],
    }),
    respuesta3: this.fb.group({
      titulo: '',
      esCorrecto: false,
    }),
    respuesta4: this.fb.group({
      titulo: '',
      esCorrecto: false,
    }),
  });


  constructor(
    private quizzService: QuizzService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.quizzService.tituloCuestionario, this.quizzService.descripcion);
  }

}
