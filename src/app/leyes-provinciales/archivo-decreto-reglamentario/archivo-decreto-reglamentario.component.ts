import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincial } from '../ley-provincial';
import { ModalDecretoReglamentarioService } from './modal-decreto-reglamentario.service';
import { LeyProvincialService } from '../ley-provincial.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-archivo-decreto-reglamentario',
  templateUrl: './archivo-decreto-reglamentario.component.html',
  styleUrls: ['./archivo-decreto-reglamentario.component.css']
})
export class ArchivoDecretoReglamentarioComponent implements OnInit {

  @Input() leyProvincial: LeyProvincial; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO REGLAMENTARIO";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private leyProvincialService: LeyProvincialService, private modalDecretoReglamentarioService: ModalDecretoReglamentarioService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }

  subirArchivo() {
    this.leyProvincialService.subirArchivoDecretoReglamentario(this.archivoSeleccionado, this.leyProvincial.id)
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

  cerrarModalDecretoReglamentario1() {
    this.modalDecretoReglamentarioService.cerrarModalDecretoReglamentario();
    this.archivoSeleccionado = null;
    this.progreso = 0;
  }


}
