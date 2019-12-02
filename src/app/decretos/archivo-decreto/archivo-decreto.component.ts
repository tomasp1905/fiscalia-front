import { Component, OnInit, Input } from '@angular/core';
import { Decreto } from '../decreto';
import { DecretoService } from '../decreto.service';
import { ModalDecretoService } from './modal-decreto.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-archivo-decreto',
  templateUrl: './archivo-decreto.component.html',
  styleUrls: ['./archivo-decreto.component.css']
})
export class ArchivoDecretoComponent implements OnInit {

  @Input() decreto: Decreto; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private decretoService: DecretoService, public modalDecretoService: ModalDecretoService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }


  subirArchivo() {
    this.decretoService.subirArchivoDecreto(this.archivoSeleccionado, this.decreto.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);


          this.decreto = response.decreto as Decreto;
          console.log(this.decreto);
          console.log(response.decreto);
          console.log(response.mensaje);

          swal.fire('Archivo subido completamente', response.mensaje, 'success');
          console.log("Esta es el decreto" + this.decreto.id);
        }

      });
  }

  cerrarModal() {
    this.modalDecretoService.cerrarModal();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
