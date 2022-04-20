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

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ingresarNombre() {
    this.respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar', 'iniciar-contador']);
  }

}
