import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Cuestionario } from '../models/cuestionario.model';


@Injectable({
  providedIn: 'root'
})
export class RespuestaQuizzService {

  cuestionario!: Cuestionario;
  nombreParticipante: string = '';
  private coleccion: string[] = ['cuestionarios', 'respuestas'];

  constructor(private _firestore: AngularFirestore) { }

  searchByCode(code: string): Observable<any> {
    return this._firestore.collection(this.coleccion[0], ref => ref.where('codigo', '==', code)).get();
  }

  setRespuestaUsuario(respuestaUsuario: any): Promise<any> {
    return this._firestore.collection(this.coleccion[1]).add(respuestaUsuario);
  }

  getRespuestaUsuario(id: string): Observable<any> {
    return this._firestore.collection(this.coleccion[1]).doc(id).get();
  }

  getRespuestaByIdCuestionario(id: string): Observable<any> {
    return this._firestore.collection(this.coleccion[1], ref => ref.where('idCuestionario', '==', id)).snapshotChanges();
  }

  deleteRespuestaUsuario(id: string): Promise<any> {
    return this._firestore.collection(this.coleccion[1]).doc(id).delete();
  }

}
