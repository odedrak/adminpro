import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // La subida de archivos se hace por javascript puro. No hay ningun modulo de angular que lo permita de momento
  subirArchivo( archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        // estado 4 cuando ha terminado
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida correctamente');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Error al subir la imagen');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);

      xhr.send(formData);

    });

  }
}
