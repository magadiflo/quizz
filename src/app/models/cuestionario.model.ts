import { Pregunta } from './pregunta.model';

export class Cuestionario {
    constructor(
        public uid: string,
        public titulo: string,
        public descripcion: string,
        public codigo: string,
        public cantPreguntas: number,
        public fechaCreacion: Date,
        public listaPreguntas: Pregunta[],
        public id?: string,
    ) { }
}