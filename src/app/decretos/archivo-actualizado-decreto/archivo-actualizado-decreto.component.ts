import { Component, OnInit, Input } from '@angular/core';
import { Decreto } from '../decreto';
import { DecretoService } from '../decreto.service';
import { ModalActualizadoDecretoService } from './modal-actualizado-decreto.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-archivo-actualizado-decreto',
  templateUrl: './archivo-actualizado-decreto.component.html',
  styleUrls: ['./archivo-actualizado-decreto.component.css']
})
export class ArchivoActualizadoDecretoComponent implements OnInit {

  @Input() decreto: Decreto; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO";
  private archivoSeleccionado: File;
  progreso: number = 0;


  constructor(private decretoService: DecretoService, private modalActualizadoDecretoService: ModalActualizadoDecretoService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }

  subirArchivo() {
    this.decretoService.subirArchivoActualizado(this.archivoSeleccionado, this.decreto.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);


          this.decreto = response.decreto as Decreto;
          location.reload();
          // console.log(this.decreto);
          // console.log(response.decreto);
          // console.log(response.mensaje);
          //
          // swal.fire('Archivo subido completamente', response.mensaje, 'success');
          // console.log("Esta es el decreto" + this.decreto.id);
        }

      });
  }

  cerrarModalActualizado() {
    this.modalActualizadoDecretoService.cerrarModalActualizado();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
