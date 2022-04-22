import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';
import { Respuesta } from '../../../models/respuesta.model';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
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
      if (this.segundos === 0) {
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
      'seleccionado': respuesta === this.opcionSeleccionada
    }
  }

  siguiente(): void {
    clearInterval(this.setInterval);
    this.agregarRespuesta();
    this.iniciarContador();
  }

  agregarRespuesta() {
    //* Incrementamos contadores (correcta e incorrecta)
    this.contadorCorrectaIncorrecta();

    //* Creamos objeto respuesta y lo agregamos al array
    const respuestaUsuario: any = {
      titulo: this.cuestionario.listaPreguntas[this.indexPregunta].titulo,
      puntosObtenidos: this.obtenemosPuntosPregunta(),
      segundos: this.obtenemosSegundos(),
      indexRespuestaSeleccionada: this.obtenemosIndexSeleccionado(),
      listRespuestas: this.cuestionario.listaPreguntas[this.indexPregunta].listaRespuestas
    }

    this.listRespuestaUsuario.push(respuestaUsuario);
    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    //* Validamos si es la última pregunta
    if (this.cuestionario.listaPreguntas.length - 1 === this.indexPregunta) {
      clearInterval(this.setInterval);
      this.guardarRespuestaCuestionario();
      this.router.navigate(['/jugar', 'respuesta-usuario']);
    } else {
      this.indexPregunta++;
      this.segundos = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;
    }
  }

  obtenemosPuntosPregunta(): number {
    //* Si el usuario no seleccionó ninguna pregunta
    if (this.opcionSeleccionada === undefined) {
      return 0;
    }

    const puntosPregunta = this.cuestionario.listaPreguntas[this.indexPregunta].puntos;

    //* Validamos si la pregunta es correcta
    if (this.opcionSeleccionada.esCorrecta === true) {
      //*Incrementamos la variable puntosTotales...
      this.puntosTotales += puntosPregunta;
      return puntosPregunta;
    }

    return 0;
  }

  obtenemosSegundos(): string {
    //* Validamos si el usuario no respondió la pregunta
    if (this.opcionSeleccionada === undefined) {
      return 'NO RESPONDIÓ';
    }
    const segundosPregunta = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;
    const segundosRespondidos = segundosPregunta - this.segundos;
    return segundosRespondidos.toString();
  }

  obtenemosIndexSeleccionado() {
    return this.opcionSeleccionada === undefined ? '' : this.indexSeleccionado;
  }

  contadorCorrectaIncorrecta() {
    //* Validamos si el usuario seleccionó pregunta
    if (this.opcionSeleccionada === undefined) {
      this.cantidadIncorrectas++;
      return;
    }

    //* Preguntamos si la opción es incorrecta
    if (this.opcionSeleccionada.esCorrecta === false) {
      this.cantidadIncorrectas++;
    } else {
      this.cantidadCorrectas++;
    }
  }

  guardarRespuestaCuestionario() {
    const respuestaCuestionario: any = {
      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario.cantPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario: this.listRespuestaUsuario,
    }

    console.log(respuestaCuestionario);  
  }

}
