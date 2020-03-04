import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincialService } from '../ley-provincial.service';
import { LeyProvincial } from '../ley-provincial';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { ModalActualizadoService } from './modal-actualizado.service';

@Component({
  selector: 'app-archivo-actualizado',
  templateUrl: './archivo-actualizado.component.html',
  styleUrls: ['./archivo-actualizado.component.css']
})
export class ArchivoActualizadoComponent implements OnInit {

  @Input() leyProvincial: LeyProvincial; //INPUT MODAL
  titulo: string = "ARCHIVO LEY PROVINCIAL";
  private archivoSeleccionado: File;
  progreso: number = 0;


  constructor(private leyProvincialService: LeyProvincialService, public modalActualizadoService: ModalActualizadoService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }


  subirArchivo() {
    this.leyProvincialService.subirArchivoActualizado(this.archivoSeleccionado, this.leyProvincial.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);


          this.leyProvincial = response.leyprovincial as LeyProvincial;
          location.reload();
          // console.log(this.leyProvincial);
          // console.log(response.leyProvincial);
          // console.log(response.mensaje);
          //
          // swal.fire('Archivo subido completamente', response.mensaje, 'success');
          // console.log("Esta es la Ley provincial" + this.leyProvincial.id);
        }

      });
  }

  cerrarModalActualizado() {
    this.modalActualizadoService.cerrarModalActualizado();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
