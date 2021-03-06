import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit {

  loading: boolean = false;
  respuesta: any;
  rutaAnterior: string = '';

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.rutaAnterior = this.activatedRoute.snapshot.url[0].path;
    this.loading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.respuestaQuizzService.getRespuestaUsuario(id))
      )
      .subscribe(doc => {
        if (!doc.exists) {
          this.router.navigate(['/']);
        }
        this.loading = false;
        this.respuesta = doc.data();
        console.log(this.respuesta);
      });
  }

  volver() {
    if (this.rutaAnterior === 'respuesta-admin') {
      this.router.navigate(['/dashboard','estadisticas', this.respuesta.idCuestionario]);     
    } else {
      this.router.navigate(['/']);
    }
  }

}
