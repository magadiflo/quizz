import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string {
    const ERRORES: any = {
      //Register
      'auth/email-already-in-use': 'El correo ya fue registrado',
      'auth/invalid-email': 'El formato del correo no es válido',
      'auth/weak-password': 'La contraseña debe tener como mínimo 6 caracteres',
      //Login
      'auth/user-not-found': 'Usuario inválido',
      'auth/wrong-password': 'La contraseña no es válida',
    };
    return ERRORES[code] || 'Error desconocido';
  }
}
