import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DecretoLey } from './decretoLey';
import { DecretoLeyService } from './decreto-ley.service';

@Component({
  selector: 'app-form-decreto-ley',
  templateUrl: './form-decreto-ley.component.html',
  styleUrls: ['./form-decreto-ley.component.css']
})
export class FormDecretoLeyComponent implements OnInit {

  public decretoLey: DecretoLey = new DecretoLey();
  errores: string[];

  constructor(private decretoLeyService:DecretoLeyService, private router: Router,private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.decretoLeyService.getDecretoLey(id).subscribe((decretoLey) => this.decretoLey = decretoLey);
      }
    });
  }

  cargarDecretoLey(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.decretoLeyService.getDecretoLey(id).subscribe((decretoLey) => this.decretoLey = decretoLey)
      }
    })
  }

   create(): void {
    this.decretoLeyService.create(this.decretoLey).subscribe(
      decretoLey => {
        this.router.navigate(['/decretosLey'])
        swal.fire('Nuevo Decreto Ley', `El Decreto Ley ${this.decretoLey.numero} se creó con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

update(): void {
  this.decretoLeyService.update(this.decretoLey)
    .subscribe(json => {
      this.router.navigate(['/decretosLey'])
      swal.fire('Decreto Ley Actualizado', `El Decreto Ley ${this.decretoLey.numero} se actualizó con éxito`, 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
}

}
