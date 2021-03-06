import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { QuizzService } from '../../../services/quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';


@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {

  subscriptionUser: Subscription = new Subscription();
  subscriptionQuizz: Subscription = new Subscription();
  listaCuestionarios: Cuestionario[] = [];
  loading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _quizzService: QuizzService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionUser = this.afAuth.user.subscribe(user => {
      if (user && user.emailVerified) {
        this.getCuestionarios(user.uid);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    this.subscriptionQuizz.unsubscribe();
  }

  getCuestionarios(uid: string) {
    this.subscriptionQuizz = this._quizzService.getCuestionarioByIdUser(uid)
      .subscribe({
        next: data => {
          this.listaCuestionarios = [];
          data.forEach((element: any) => {
            this.listaCuestionarios.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
          });
          this.loading = false;
        },
        error: error => {
          console.log(error);
          this.toastr.error('¡Ups! Ocurrió un error', '¡Error!');
          this.loading = false;
        }
      });
  }

  eliminarCuestionario(id: string) {
    this.loading = true;
    this._quizzService.eliminarCuestionario(id).then(data => {
      this.loading = false;
      this.toastr.info('El cuestionario fue eliminado con éxito', 'Registro eliminado');
    }).catch(error => {
      this.loading = false;
      this.toastr.error('¡Ups! Ocurrió un error al eliminar el cuestionario', '¡Error!');
    });
  }

}
