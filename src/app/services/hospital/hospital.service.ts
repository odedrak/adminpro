import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, public _subirArchivoService: SubirArchivoService, public _usuarioService: UsuarioService) { }


  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map( resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
      })
    );
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre: nombre}).pipe(
      map( (resp: any) => {
        return  resp.hospital;
      })
    );
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => resp.hospitales )
    );
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return resp.hospital;
      })
    );
  }
}
