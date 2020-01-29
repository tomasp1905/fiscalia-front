import { Component, OnInit } from '@angular/core';
import { Decreto } from './decreto';
import { DecretoService } from './decreto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-decreto',
  templateUrl: './form-decreto.component.html',
  styleUrls: ['./form-decreto.component.css']
})
export class FormDecretoComponent implements OnInit {

  public decreto: Decreto = new Decreto();
  errores: string[];

  constructor(private decretoService: DecretoService, private router: Router,private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.decretoService.getDecreto(id).subscribe((decreto) => this.decreto = decreto);
      }
    });
  }

  cargarLey(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.decretoService.getDecreto(id).subscribe((decreto) => this.decreto = decreto)
      }
    })
  }

/*  COMENTO POR SI LLEGA A FALLAR EL NUEVO CAMBIO
   create(): void {
    this.decretoService.create(this.decreto).subscribe(
      decreto => {
        this.router.navigate(['/decretos'])
        swal.fire('Nuevo Decreto', `El Decreto se creó con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  } */

  create(): void {
   this.decretoService.create(this.decreto).subscribe(
     decreto => {
       this.router.navigate(['/decretos'])
       swal.fire('Nuevo Decreto', `El Decreto ${this.decreto.numero} se creó con éxito`, 'success')
     },
     err => {
       this.errores = err.error.errors as string[];
       console.error('Código del error desde el backend: ' + err.status);
       console.error(err.error.errors);
     }
   );
 }

update(): void {
  this.decretoService.update(this.decreto)
    .subscribe(json => {
      this.router.navigate(['/decretos'])
      swal.fire('Decreto Actualizado',`El Decreto ${this.decreto.numero} se actualizó con éxito`, 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
}

}
