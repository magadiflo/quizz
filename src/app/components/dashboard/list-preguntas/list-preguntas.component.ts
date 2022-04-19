import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { nanoid } from 'nanoid';
import { ToastrService } from 'ngx-toastr';

import { QuizzService } from '../../../services/quizz.service';
import { Pregunta } from '../../../models/pregunta.model';
import { Respuesta } from '../../../models/respuesta.model';
import { Cuestionario } from '../../../models/cuestionario.model';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {

  listaPreguntas: Pregunta[] = [];

  constructor(
    private quizzService: QuizzService,
    private router: Router,
    private toastr: ToastrService) { }

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
    const usuario: User = JSON.parse(localStorage.getItem('user') || '{}');
    const cuestionario: Cuestionario = {
      uid: usuario.uid,
      titulo: this.quizzService.tituloCuestionario,
      descripcion: this.quizzService.descripcion,
      codigo: this.generarCodigo(),
      cantPreguntas: this.listaPreguntas.length,
      fechaCreacion: new Date(),
      listaPreguntas: this.listaPreguntas,
    }
    this.quizzService.crearCuestionario(cuestionario).then(data => {
      this.toastr.success('El cuestionario fue registrado exitosamente', '¡Completado!');
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.log(error);  
    });
  }

  generarCodigo(): string {
    return nanoid(6).toUpperCase();
  }

  activa(respuesta: Respuesta) {
    return {
      'active text-white': respuesta.esCorrecta === true
    }
  }

}
