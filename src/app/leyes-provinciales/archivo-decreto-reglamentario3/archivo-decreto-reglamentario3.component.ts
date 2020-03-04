import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincial } from '../ley-provincial';
import { LeyProvincialService } from '../ley-provincial.service';
import { ModalDecretoReglamentario3Service } from './modal-decreto-reglamentario3.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-archivo-decreto-reglamentario3',
  templateUrl: './archivo-decreto-reglamentario3.component.html',
  styleUrls: ['./archivo-decreto-reglamentario3.component.css']
})
export class ArchivoDecretoReglamentario3Component implements OnInit {

  @Input() leyProvincial: LeyProvincial; //INPUT MODAL
  titulo: string = "ARCHIVO DECRETO REGLAMENTARIO";
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private leyProvincialService: LeyProvincialService, public modalDecretoReglamentario3Service:ModalDecretoReglamentario3Service) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }

  subirArchivo() {
    this.leyProvincialService.subirArchivoDecretoReglamentario3(this.archivoSeleccionado, this.leyProvincial.id)
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

  cerrarModalDecretoReglamentario3(){
    this.modalDecretoReglamentario3Service.cerrarModalDecretoReglamentario();
    this.archivoSeleccionado = null;
    this.progreso = 0;

  }

}
