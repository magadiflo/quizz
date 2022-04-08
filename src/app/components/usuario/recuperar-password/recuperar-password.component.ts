import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  recuperarPassword(): void {
    console.log(this.miFormulario.value);  
  }

  campoNoEsValido(campo: string, validacion: string): boolean {
    return this.miFormulario.get(campo)!.hasError(validacion) && this.miFormulario.get(campo)!.touched;
  }

}
