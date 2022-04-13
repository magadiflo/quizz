import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent implements OnInit {

  mostrarError: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private quizzService: QuizzService) { }

  ngOnInit(): void {
  }

  siguiente(): void {
    if (this.miFormulario.invalid) {
      // Mostrar error por 3 segundos
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
    } else {
      const { titulo, descripcion } = this.miFormulario.value;
      this.quizzService.tituloCuestionario = titulo;
      this.quizzService.descripcion = descripcion;
      this.router.navigate(['/dashboard/crear-preguntas']);
    }
  }

}
