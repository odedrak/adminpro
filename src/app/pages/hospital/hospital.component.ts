import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

// Para evitar que se marquen como errores las opciones ya que swal no esta bien definido  todavia
declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = false;

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    // Suscripcion a las notificaciones del emiter
    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe( (hospitales: any) => {
        this.hospitales = hospitales;
        this.cargando = false;
    });
  }

  buscarHospital( termino: string ) {

    if ( termino.length === 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  mostrarModal( id: string, imagen: string) {
    this._modalUploadService.mostrarModal('hospitales', id, imagen);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Está seguro?',
      text: 'Está a punto de borrar ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( () => {

          this.cargarHospitales();

        });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true
    })
    .then( (valor: string) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe( () => this.cargarHospitales());

    });
  }

}
