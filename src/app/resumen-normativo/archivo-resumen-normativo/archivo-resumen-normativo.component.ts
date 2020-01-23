import { Component, OnInit, Input } from '@angular/core';
import { ResumenNormativo } from '../resumenNormativo';
import { ResumenNormativoService } from '../resumen-normativo.service';
import { ModalResumenSemanalService } from './modal-resumen-semanal.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-archivo-resumen-normativo',
  templateUrl: './archivo-resumen-normativo.component.html',
  styleUrls: ['./archivo-resumen-normativo.component.css']
})
export class ArchivoResumenNormativoComponent implements OnInit {

  @Input() resumen: ResumenNormativo;
  titulo: string = "ARCHIVO RESUMEN";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private resumenNormativoService: ResumenNormativoService, public modalResumenService: ModalResumenSemanalService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);
  }

  subirArchivo() {
    this.resumenNormativoService.subirArchivoResumen(this.archivoSeleccionado, this.resumen.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);

          this.resumen = response.resumen as ResumenNormativo;

          console.log(this.resumen);
          console.log(response.resumen);
          console.log(response.mensaje);

          swal.fire('Archivo subido completamente', response.mensaje, 'success');
          //console.log("Este es el resumen" + this.resumen.id);
        }

      });
  }

  cerrarModal() {
    this.modalResumenService.cerrarModal();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
