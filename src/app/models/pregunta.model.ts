import { Respuesta } from './respuesta.model';

export class Pregunta {

    constructor(
        public titulo: string,
        public puntos: number,
        public segundos: number,
        public listaRespuestas: Respuesta[],
    ) { }

}