import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from '../../../services/error.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loading = true;
    const { usuario, password } = this.miFormulario.value;
    this.afAuth.signInWithEmailAndPassword(usuario, password).then(resp => {
      //console.log(resp);
      this.loading = false;
      if(resp.user?.emailVerified == false){
        this.router.navigate(['/usuario', 'verificar-correo']);
      } else {
        //this.toastr.success('Bienvenido', '¡Acceso correcto!');
        this.setLocalStorage(resp.user);
        this.router.navigate(['/dashboard']);
      }
    }).catch(error => {
      console.log(error);
      this.toastr.error(this._errorService.error(error.code), '¡Error!');
      this.loading = false;
      this.miFormulario.reset();
    });
  }

  campoNoEsValido(campo: string, validacion: string): boolean {
    return this.miFormulario.get(campo)!.hasError(validacion) && this.miFormulario.get(campo)!.touched;
  }

  setLocalStorage(user: any) {   
    const usuario: User = {
      uid: user.uid,
      email: user.email,
    }
    localStorage.setItem('user', JSON.stringify(usuario));
  }

}
