import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router, 
    private toastr: ToastrService,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  recuperarPassword(): void {
    this.loading = true;
    const { correo } = this.miFormulario.value;
    this.afAuth.sendPasswordResetEmail(correo).then(() => {
      this.toastr.info('Enviamos un correo electrónico para reestablecer su password', 'Reestablecer password'); 
      this.router.navigate(['/usuario']);
      this.loading = false;
    }).catch(error => {
      this.toastr.error(this._errorService.error(error.code), 'Error');
      this.miFormulario.reset();
      this.loading = false;
    });
  }

  campoNoEsValido(campo: string, validacion: string): boolean {
    return this.miFormulario.get(campo)!.hasError(validacion) && this.miFormulario.get(campo)!.touched;
  }

}
