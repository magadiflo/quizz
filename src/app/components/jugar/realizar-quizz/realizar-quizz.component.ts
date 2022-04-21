import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit {

  cuestionario!: Cuestionario;
  nombreParticipante: string = '';

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router) { }

  ngOnInit(): void {
    this.cuestionario = this.respuestaQuizzService.cuestionario;
    this.nombreParticipante = this.respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
  }

  validateRefresh(): void {
    if(this.cuestionario == undefined){
      this.router.navigate(['/']);
    }
  }

  obtenerSegundos(): number {
    return this.cuestionario.listaPreguntas[0].segundos;
  }

  obtenerTitulo(): string {
    return this.cuestionario.listaPreguntas[0].titulo;
  }

}
