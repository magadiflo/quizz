import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';
import { Respuesta } from '../../../models/respuesta.model';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit {

  cuestionario!: Cuestionario;
  nombreParticipante: string = '';
  indexPregunta: number = 0;
  segundos: number = 0;
  setInterval: any;

  //* Respuesta usuario
  opcionSeleccionada: Respuesta | undefined;
  indexSeleccionado: number | undefined;
  cantidadCorrectas: number = 0;
  cantidadIncorrectas: number = 0;
  puntosTotales: number = 0;
  listRespuestaUsuario: any[] = [];

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router) { }

  ngOnInit(): void {
    this.cuestionario = this.respuestaQuizzService.cuestionario;
    this.nombreParticipante = this.respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
    this.iniciarContador();
  }

  validateRefresh(): void {
    if (this.cuestionario == undefined) {
      this.router.navigate(['/']);
    }
  }

  obtenerSegundos(): number {
    return this.segundos;
  }

  obtenerTitulo(): string {
    return this.cuestionario.listaPreguntas[this.indexPregunta].titulo;
  }

  iniciarContador() {
    this.segundos = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;
    this.setInterval = setInterval(() => {
      if(this.segundos === 0){
        this.agregarRespuesta();
      }
      this.segundos--;
    }, 1000);
  }

  respuestaSeleccionada(respuesta: Respuesta, index: number) {
    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
    console.log(this.opcionSeleccionada);
    console.log(this.indexSeleccionado);  
  }

  addClassOption(respuesta: Respuesta) {
    return {
      'seleccionado' : respuesta === this.opcionSeleccionada
    }
  }

  siguiente(): void {
    clearInterval(this.setInterval);
    this.agregarRespuesta();
    this.iniciarContador();
  }

  agregarRespuesta() {
    // *Creamos objeto respuesta y lo agregamos al array
    const respuestaUsuario: any = {
      titulo: this.cuestionario.listaPreguntas[this.indexPregunta].titulo,
      puntosObtenidos: '',
      segundos: '',
      indexRespuestaSeleccionada: '',
      listRespuestas: this.cuestionario.listaPreguntas[this.indexPregunta].listaRespuestas
    }

    this.listRespuestaUsuario.push(respuestaUsuario);
    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    if(this.cuestionario.listaPreguntas.length - 1 === this.indexPregunta){
      clearInterval(this.setInterval);
      // TODO: Guardamos la respuesta en Firebase. 
      this.router.navigate(['/jugar', 'respuesta-usuario']);
    } else {
      this.indexPregunta++;
      this.segundos = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;
    }
  }

}
