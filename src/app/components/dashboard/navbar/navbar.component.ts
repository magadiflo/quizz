import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
