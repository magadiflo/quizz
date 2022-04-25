import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, switchMap } from 'rxjs';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  loading: boolean = false;
  listRespuestasUsuario: any[] = [];
  respuestaQuizz: Subscription = new Subscription();


  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.respuestaQuizzService.getRespuestaByIdCuestionario(id))
      )
      .subscribe({
        next: data => {
          this.loading = false;
          this.listRespuestasUsuario = [];
          data.forEach((element: any) => {
            this.listRespuestasUsuario.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
          });
          console.log(this.listRespuestasUsuario);
        },
        error: error => {
          this.loading = false;
          console.log(error);
        }
      });
  }

}
