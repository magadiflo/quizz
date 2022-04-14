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
      esCorrecta: [false, [Validators.required]],
    }),
    respuesta2: this.fb.group({
      titulo: ['', [Validators.required]],
      esCorrecta: [false, [Validators.required]],
    }),
    respuesta3: this.fb.group({
      titulo: '',
      esCorrecta: false,
    }),
    respuesta4: this.fb.group({
      titulo: '',
      esCorrecta: false,
    }),
  });

  get seg(): number {
    return this.miFormulario.controls['segundos'].value;
  }

  get puntos(): number {
    return this.miFormulario.controls['puntos'].value;
  }

  constructor(
    private quizzService: QuizzService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.quizzService.tituloCuestionario, this.quizzService.descripcion);
  }

  agrearPregunta() {
    console.log(this.miFormulario.value);
  }

  cambiaSegundos(segundos: number): void {
    const s = this.seg + segundos;
    this.miFormulario.patchValue({
      segundos: s < 5 ? 5 : s
    });
  }

  esCorrecta(campoRespuesta: string): void {
    this.miFormulario.get(campoRespuesta)?.patchValue({
      esCorrecta: !this.obtenerEstadoRespuesta(campoRespuesta),
    });
  }

  obtenerEstadoRespuesta(campoRespuesta: string): boolean {
    return this.miFormulario.get(campoRespuesta)?.get('esCorrecta')?.value;
  }

  cambiaIconoRespuesta(campoRespuesta: string) {
    return {
      'far fa-circle' : !this.obtenerEstadoRespuesta(campoRespuesta),
      'fas fa-check-circle animate__animated animate__heartBeat': this.obtenerEstadoRespuesta(campoRespuesta)
    }
  }

}
