import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


// Para ejecutar funcion de JQuery que inicializa los componentes del template
declare function init_plugins();
// Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;


  constructor( public router: Router, public _usuarioService: UsuarioService) { }

 

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '131170900646-guf4rf2ippbls9m06ava7ilv17f7mumo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // this._usuarioService.loginGoogle(token).subscribe( correcto => this.router.navigate(['/dashboard']));

      // El template falla al redireccionar con el router. Se usará redirección manual
      this._usuarioService.loginGoogle(token).subscribe( correcto => window.location.href = '#/dashboard');
    });
  }

  entrar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
