import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

import { QuizzService } from '../../../services/quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';


@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {

  subscriptionUser: Subscription = new Subscription();
  listaCuestionarios: Cuestionario[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _quizzService: QuizzService) { }

  ngOnInit(): void {
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
  }

  getCuestionarios(uid: string) {
    this._quizzService.getCuestionarioByIdUser(uid)
      .subscribe(data => {
        this.listaCuestionarios = [];
        data.forEach((element: any) => {
          this.listaCuestionarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        console.log(this.listaCuestionarios);
      });
  }

}
