import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { DecretoReglamentario } from '../decretoReglamentario';
import { DecretoReglamentarioService } from '../decreto-reglamentario.service';
import { ModalDecretoReglamentarioService } from './modal-decreto-reglamentario.service';

@Component({
  selector: 'app-archivo-decreto-reglamentario',
  templateUrl: './archivo-decreto-reglamentario.component.html',
  styleUrls: ['./archivo-decreto-reglamentario.component.css']
})
export class ArchivoDecretoReglamentarioComponent implements OnInit {

  @Input() decretoReglamentario: DecretoReglamentario; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO REGLAMENTARIO";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private decretoReglamentarioService: DecretoReglamentarioService, public modalDecretoReglamentarioService: ModalDecretoReglamentarioService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);
  }

  subirArchivo() {
    this.decretoReglamentarioService.subirArchivoDecretoReglamentario(this.archivoSeleccionado, this.decretoReglamentario.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;

          console.log(response);


          this.decretoReglamentario = response.decretoReglamentario as DecretoReglamentario;
          console.log(this.decretoReglamentario);
          console.log(response.decretoReglamentario);
          console.log(response.mensaje);

          swal.fire('Archivo subido completamente', response.mensaje, 'success');
          console.log("Este es el decreto reglamentario" + this.decretoReglamentario.id);
        }

      });
  }

  cerrarModal() {
    this.modalDecretoReglamentarioService.cerrarModal();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }

}
