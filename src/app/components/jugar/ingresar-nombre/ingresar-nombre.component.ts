import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombre: string = '';
  errorText: string = '';
  error: boolean = false;

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router) { }

  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre() {
    if(this.nombre.trim() === ''){
      return this.errorMensaje('Ingrese su nombre');
    }
    this.respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar', 'iniciar-contador']);
  }

  errorMensaje(texto: string): void {
    this.errorText = texto;
    this.error = true;

    //* Mostramos el error por 4 segundos
    setTimeout(() => {
      this.error = false;
    }, 4000);
  }

  validarRefresh() {
    if(this.respuestaQuizzService.cuestionario == undefined){
      this.router.navigate(['/']);
    }
  }

}
