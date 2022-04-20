import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { QuizzService } from '../../../services/quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit {

  loading: boolean = false;
  cuestionario!: Cuestionario;

  constructor(
    private quizzService: QuizzService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.quizzService.getCuestionario(id))
      )
      .subscribe(doc => {
        this.cuestionario = doc.data();
        this.loading = false;
      });
  }

  active(esCorrecta: boolean) {  
    return {
      'active text-white': esCorrecta
    }
  }

}
