import { Component, OnInit } from '@angular/core';

import { QuizzService } from '../../../services/quizz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {

  mostrarError: boolean = false;

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

  agrearPregunta(): void {
    console.log(this.miFormulario.value);
    if (this.miFormulario.invalid || this.todasIncorrectas()) {
      return this.error();
    }
  }

  todasIncorrectas(): boolean { //Verifica que solo haya una respuesta seleccionada
    const camposRespuestas = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    return camposRespuestas.filter(campo => this.miFormulario.get(campo)?.get('esCorrecta')?.value === true).length !== 1;
  }

  error(): void {
    this.mostrarError = true;
    setTimeout(() => this.mostrarError = false, 3000);
  }

  cambiaSegundos(segundos: number): void {
    const s = this.seg + segundos;
    this.miFormulario.patchValue({
      segundos: s < 5 ? 5 : s
    });
  }

  esCorrecta(campoRespuesta: string): void {
    if ((campoRespuesta == 'respuesta3' || campoRespuesta == 'respuesta4') && !this.tieneValor(campoRespuesta)) {
      return;
    }
    this.setChangeValueRespuesta(campoRespuesta, !this.obtenerEstadoRespuesta(campoRespuesta));
    this.setFalseRespuestas(campoRespuesta);
  }

  obtenerEstadoRespuesta(campoRespuesta: string): boolean {
    return this.miFormulario.get(campoRespuesta)?.get('esCorrecta')?.value;
  }

  tieneValor(campo: string): boolean {
    return this.miFormulario.get(campo)?.get('titulo')?.value.trim() != '';
  }

  setFalseRespuestas(campoRespuestaSelec: string) {
    const camposRespuestas = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    camposRespuestas
      .filter(campo => campo != campoRespuestaSelec)
      .map(campoNoSeleccionado => this.setChangeValueRespuesta(campoNoSeleccionado, false));
  }

  setChangeValueRespuesta(campo: string, value: boolean): void {
    this.miFormulario.get(campo)?.patchValue({
      esCorrecta: value
    });
  }

  cambiaIconoRespuesta(campoRespuesta: string) {
    return {
      'far fa-circle': !this.obtenerEstadoRespuesta(campoRespuesta),
      'fas fa-check-circle animate__animated animate__heartBeat': this.obtenerEstadoRespuesta(campoRespuesta)
    }
  }

  cambio(campo: string) {
    if (!this.tieneValor(campo)) {
      this.setChangeValueRespuesta(campo, false);
    }
  }

}
