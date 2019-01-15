import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
      case 'usuarios':
        url += '/usuarios/' + img;
      break;
      case 'medico':
      case 'medicos':
        url += '/medicos/' + img;
      break;
      case 'hospital':
      case 'hospitales':
        url += '/hospitales/' + img;
      break;
      default:
        console.log('Tipo de imagen no existe: usuario, medico, hospital');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
