import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    // Javascript nativo. Visualizar en la pagina el archivo selecionado antes de subirlo
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {
      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error subiendo imagen');
    });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    // Para borrar el nombre del archivo cuando se cierra el modal
    (<HTMLInputElement>document.getElementById('imagenModal')).value = '';
    this._modalUploadService.ocultarModal();
  }

}
