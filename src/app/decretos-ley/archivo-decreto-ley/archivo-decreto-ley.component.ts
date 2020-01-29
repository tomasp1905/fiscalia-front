import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { DecretoLey } from '../decretoLey';
import { DecretoLeyService } from '../decreto-ley.service';
import { ModalDecretoLeyService } from './modal-decreto-ley.service';

@Component({
  selector: 'app-archivo-decreto-ley',
  templateUrl: './archivo-decreto-ley.component.html',
  styleUrls: ['./archivo-decreto-ley.component.css']
})
export class ArchivoDecretoLeyComponent implements OnInit {

  @Input() decretoLey: DecretoLey; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO LEY";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private decretoLeyService: DecretoLeyService, public modalDecretoLeyService: ModalDecretoLeyService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);
  }

  subirArchivo() {
    this.decretoLeyService.subirArchivoDecretoLey(this.archivoSeleccionado, this.decretoLey.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);

          this.decretoLey = response.decreto as DecretoLey;
          location.reload();
          // console.log(this.decretoLey);
          // console.log(response.decretoLey);
          // console.log(response.mensaje);
          //
          // swal.fire('Archivo subido completamente', response.mensaje, 'success');
          // console.log("Este es el decreto" + this.decretoLey.id);
        }

      });
  }

  cerrarModal() {
    this.modalDecretoLeyService.cerrarModal();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
