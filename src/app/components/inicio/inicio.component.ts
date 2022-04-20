import { Component, OnInit } from '@angular/core';

import { RespuestaQuizzService } from '../../services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  error: boolean = false;
  pin: string = '';
  errorText: string = '';
  loading: boolean = false;

  constructor(private respuestaQuizzService: RespuestaQuizzService) { }

  ngOnInit(): void {
  }

  ingresar(): void {
    if (this.pin.trim() === '') {
      this.errorMensaje('Por favor ingrese pin');
      return;
    }

    this.loading = true;
    this.respuestaQuizzService.searchByCode(this.pin)
      .subscribe({
        next: data => {
          this.loading = false;
          if (data.empty) {
            this.errorMensaje('PIN inválido');
          }
        },
        error: error => console.log(error)
      });
  }

  errorMensaje(texto: string) {
    this.errorText = texto;
    this.error = true;
    this.pin = '';

    //Mostramos el error por 4 segundos
    setTimeout(() => {
      this.error = false;
    }, 4000);
  }

}
