import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Subject, Observable } from 'rxjs';

import { Pregunta } from '../models/pregunta.model';
import { Cuestionario } from '../models/cuestionario.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  tituloCuestionario: string = '';
  descripcion: string = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor(private _firestore: AngularFirestore) { }

  agregarPregunta(pregunta: Pregunta) {
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta> {
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any> {
    return this._firestore.collection('cuestionarios').add(cuestionario);
  }

  getCuestionarioByIdUser(uid: string) {
    return this._firestore.collection('cuestionarios', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }

}
