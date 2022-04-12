import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    'password-repeat': [''],
  }, {
    validators: [this.checkPassword('password', 'password-repeat')],
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

  registrar(): void {
    this.loading = true;
    const usuario = this.miFormulario.get('usuario')?.value;
    const password = this.miFormulario.get('password')?.value;
    this.afAuth.createUserWithEmailAndPassword(usuario, password).then(resp => {
      resp.user?.sendEmailVerification(); 
      this.toastr.success('Enviamos un correo electrónico para verificar su cuenta', '¡Usuario registrado!');
      this.router.navigate(['/usuario']);
    }).catch(error => {
      console.log(error.code);
      console.log(error);  
      this.miFormulario.reset();
      this.loading = false;
      this.toastr.error(this._errorService.error(error.code), '¡Error!');
    });
  }

  campoNoEsValido(campo: string, validacion: string): boolean {
    return this.miFormulario.get(campo)!.hasError(validacion) && this.miFormulario.get(campo)!.touched;
  }

  checkPassword(password: string, passworRepeat: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passControl = formGroup.get(password);
      const passRepControl = formGroup.get(passworRepeat);
      if (passControl?.value !== passRepControl?.value) {
        formGroup.get(passworRepeat)?.setErrors({ noEsIgual: true });
        return { noEsIgual: true };
      }
      formGroup.get(passworRepeat)?.setErrors(null);
      return null;
    }  
  }

}
