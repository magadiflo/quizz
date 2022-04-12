import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registrar(): void {
    const usuario = this.miFormulario.get('usuario')?.value;
    const password = this.miFormulario.get('password')?.value;
    this.afAuth.createUserWithEmailAndPassword(usuario, password).then(rpta => {
      this.toastr.success('El usuario fue registrado con éxito', '¡Usuario registrado!');
      this.router.navigate(['/usuario']);
    }).catch(error => {
      console.log(error);  
      this.toastr.error('No se pudo registrar el usuario', 'Ups, ocurrió un error!');
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
