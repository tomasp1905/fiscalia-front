import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincial } from '../ley-provincial';
import { LeyProvincialService } from '../ley-provincial.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'ley-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  leyProvincial: LeyProvincial;

  titulo: string = "ARCHIVO LEY PROVINCIAL";
  private archivoSeleccionado: File;
   progreso:number = 0;




  constructor(private leyProvincialService: LeyProvincialService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.leyProvincialService.getLeyProvincial(id).subscribe(leyProvincial => {
          this.leyProvincial = leyProvincial;
        });
      }
    });
   }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.progreso = 0;
    console.log(this.archivoSeleccionado);
  }

  subirArchivo() {
    this.leyProvincialService.subirArchivo(this.archivoSeleccionado, this.leyProvincial.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if (event.type === HttpEventType.Response){
          let response: any = event.body;
          this.leyProvincial = response.leyProvincial as LeyProvincial;
          swal.fire('Archivo subido completamente', response.mensaje, 'success');
          console.log("Esta es la Ley provincial" + this.leyProvincial.id);
        }


        //this.leyProvincial = leyProvincial;

      });
  }

}
