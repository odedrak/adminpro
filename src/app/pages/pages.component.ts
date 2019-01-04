import { Component, OnInit } from '@angular/core';

// Para ejecutar funcion de JQuery que inicializa los componentes del template
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
