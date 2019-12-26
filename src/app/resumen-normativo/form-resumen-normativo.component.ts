import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ResumenNormativo } from './resumenNormativo';
import { ResumenNormativoService } from './resumen-normativo.service';

@Component({
  selector: 'app-form-resumen-normativo',
  templateUrl: './form-resumen-normativo.component.html',
  styleUrls: ['./form-resumen-normativo.component.css']
})
export class FormResumenNormativoComponent implements OnInit {

  public resumen: ResumenNormativo = new ResumenNormativo();
  errores: string[];

  constructor(private resumenNormativoService: ResumenNormativoService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.resumenNormativoService.getResumen(id).subscribe((resumen) => this.resumen = resumen);
      }
    });
  }

  cargarResumenNormativo(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.resumenNormativoService.getResumen(id).subscribe((resumen) => this.resumen = resumen)
      }
    })
  }

  create(): void {
    this.resumenNormativoService.create(this.resumen).subscribe(
      resumen => {
        this.router.navigate(['/resumenesNormativos'])
        swal.fire('Nuevo Resumen Normativo', `El Resumen se creó con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.resumenNormativoService.update(this.resumen)
      .subscribe(json => {
        this.router.navigate(['/resumenesNormativos'])
        swal.fire('Resumen Normativo Actualizado', `${json.mensaje}`, 'success');
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
