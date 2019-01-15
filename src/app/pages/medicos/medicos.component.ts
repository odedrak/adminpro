import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, ModalUploadService } from '../../services/service.index';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = false;


  constructor(public _medicoService: MedicoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion.subscribe( () => this.cargarMedicos());
  }

  mostrarModal( id: string, imagen: string) {
    this._modalUploadService.mostrarModal('medicos', id, imagen);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {

    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedicos(termino).subscribe(medicos => {
      this.cargando = false;
      return this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
  }

}
