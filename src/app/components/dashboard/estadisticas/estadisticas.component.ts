import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  loading: boolean = false;
  listRespuestasUsuario: any[] = [];


  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

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

  eliminarRespuestaUsuario(id: string) {
    this.loading = true;
    this.respuestaQuizzService.deleteRespuestaUsuario(id).then(() => {
      this.loading = false;
      this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada');
    }, error => {
      console.log(error);
      this.toastr.error('Ocurrió un error al eliminar respuesta', 'Error');
    });
  }

}
