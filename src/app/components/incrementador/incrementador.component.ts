import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Referencia a un elemento html del componente
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // @Input('nombreExterno') -> Se puede modificar el nombre de la variable que se usara desde fuera, pero no es recomendable
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number ) {

    // const elemHTML: any = document.getElementsByName('progreso')[0];

    if ( newValue > 100 ) {
      this.progreso = 100;
    } else if (newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor( valor: number ) {

    if ( this.progreso + valor > 100 ) {
      this.progreso = 100;
    } else if (this.progreso + valor < 0) {
      this.progreso = 0;
    } else {
      this.progreso += valor;
    }
    this.cambioValor.emit(this.progreso);

    // Poner el foco en el texto
    this.txtProgress.nativeElement.focus();

  }

}
