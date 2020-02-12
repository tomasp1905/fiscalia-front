import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincial } from '../ley-provincial';
import { LeyProvincialService } from '../ley-provincial.service';
import { ModalDecRegService } from './modal-dec-reg.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decreto-reglamentario',
  templateUrl: './decreto-reglamentario.component.html',
  styleUrls: ['./decreto-reglamentario.component.css']
})
export class DecretoReglamentarioComponent implements OnInit {

  @Input() leyProvincial: LeyProvincial; //INPUT MODAL
  private archivoSeleccionado: File;
  progreso: number = 0;

  constructor(private leyProvincialService: LeyProvincialService, public modalDecRegService: ModalDecRegService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id) {
        this.leyProvincialService.getLeyProvincial(id).subscribe(leyProvincial => {
          this.leyProvincial = leyProvincial;
        })
      }
    })
  }

  seleccionarArchivoDecretoReg(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);

  }


  subirArchivoDecretoReg() {
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

  // cerrarModal() {
  //   this.modalDecRegService.cerrarModal();
  //   this.archivoSeleccionado = null;
  //   this.progreso = 0;
  // }

}
