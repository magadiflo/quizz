import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  error: boolean = false;
  pin: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ingresar(): void {
    if(this.pin.trim() === ''){
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      
      return;
    }
    console.log(this.pin);  
  }

}
