import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RespuestaQuizzService } from '../../services/respuesta-quizz.service';
import { Cuestionario } from '../../models/cuestionario.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  error: boolean = false;
  pin: string = '';
  errorText: string = '';
  loading: boolean = false;
  subscriptionCode: Subscription = new Subscription();

  constructor(private respuestaQuizzService: RespuestaQuizzService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptionCode.unsubscribe();
  }

  ingresar(): void {
    if (this.pin.trim() === '') {
      this.errorMensaje('Por favor ingrese pin');
      return;
    }

    this.loading = true;
    this.subscriptionCode = this.respuestaQuizzService.searchByCode(this.pin)
      .subscribe({
        next: data => {
          this.loading = false;
          if (data.empty) {
            this.errorMensaje('PIN inválido');
          } else {
            data.forEach((element: any) => {
              const cuestionario: Cuestionario = {
                id: element.id,
                ...element.data()
              }
              this.respuestaQuizzService.cuestionario = cuestionario;
              // TODO: Redireccionar al próximo componente

            });
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
