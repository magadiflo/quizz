import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Pregunta } from '../models/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  tituloCuestionario: string = '';
  descripcion: string = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor() { }

  agregarPregunta(pregunta: Pregunta) {
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta> {
    return this.pregunta$.asObservable();
  }

}
