import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this._usuarioService.token;

    // payload es el contenido del token
    // atob() decodifica una cadena de datos que ha sido codificada en base-64
    // Nos quedamos con la segunda parte del token
    // Aunque se puede recuperar la información del token, no se puede comprobar que sea valido sin la semilla. De eso se encarga el backend
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }




    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const TokenExp = new Date(fechaExp * 1000); // Pasamos la fecha de expiracion a milisegundos
      const ahora = new Date();

      // Damos un margen de una hora para renovar el token
      ahora.setTime(ahora.getTime() + ( 3600 * 1000));

      if (TokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe( () => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }

      resolve(true);
    });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }
}
