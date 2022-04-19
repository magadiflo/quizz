import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {

  subscriptionUser: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriptionUser = this.afAuth.user.subscribe(user => {
      if (user && user.emailVerified) {
        //TODO: Cargar los cuestionarios
        console.log(user);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }

}
