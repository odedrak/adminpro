import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // La suscripcion tiene 3 callbacks:
    // 1 -> El observable devuelve datos (next)
    // 2 -> Error en el observable (error). El observable finaliza
    // 3 -> Fin del observable (complete)
    /* this.devuelveObservable().subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs ', error),
      () => console.log('El observable terminó!')
    ); */

    // retry() -> reinicia el observable de forma indefinida si se produce un error, o se especifica numero de intentos
    /* this.devuelveObservable().pipe(
      retry(2)
      ).subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs ', error),
      () => console.log('El observable terminó!')
    ); */

    this.subscription = this.devuelveObservable().subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs ', error),
      () => console.log('El observable terminó!')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  devuelveObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;

        // Para probar el operador map
        const salida = {
          valor: contador
        };

        // Envio de informacion a los suscriptores
        observer.next(salida);

        /* if ( contador === 3 ) {
          clearInterval(intervalo);
          // Fin del observable
          observer.complete();
        } */

        /* if ( contador === 2 ) {
          // Si no se limpia el intervalo, en la siguiente iteracion del intervalo mantiene su valor
          clearInterval(intervalo);
          observer.error('Auxilio!');
        } */

      }, 1000);

      // pipe:
      // map -> formatea un dato de salida del observable
      // filter -> filtra los resultados para saber si se devuelve o no a los suscriptores. retorno true/false. parametros: valor, index-> numero de veces que se ha invocado el filtro
    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        // console.log('Filter ', valor, index);
        if ( (valor % 2) === 1) {
          // impar
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
