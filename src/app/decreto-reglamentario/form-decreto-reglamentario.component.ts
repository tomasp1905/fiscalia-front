import { Component, OnInit } from '@angular/core';
import { DecretoReglamentario } from './decretoReglamentario';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DecretoReglamentarioService } from './decreto-reglamentario.service';

@Component({
  selector: 'app-form-decreto-reglamentario',
  templateUrl: './form-decreto-reglamentario.component.html',
  styleUrls: ['./form-decreto-reglamentario.component.css']
})
export class FormDecretoReglamentarioComponent implements OnInit {

  public decretoReglamentario: DecretoReglamentario = new DecretoReglamentario();
  errores: string[];

  constructor(private decretoReglamentarioService: DecretoReglamentarioService, private router: Router,private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.decretoReglamentarioService.getDecretoReglamentario(id).subscribe((decretoReglamentario) => this.decretoReglamentario = decretoReglamentario);
      }
    });
  }

  cargarDecretoReglamentario(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.decretoReglamentarioService.getDecretoReglamentario(id).subscribe((decretoReglamentario) => this.decretoReglamentario = decretoReglamentario)
      }
    })
  }

  create(): void {
   this.decretoReglamentarioService.create(this.decretoReglamentario).subscribe(
     decretoReglamentario => {
       this.router.navigate(['/decretosReglamentarios'])
       swal.fire('Nuevo Decreto Reglamentario', `El Decreto se creó con éxito`, 'success')
     },
     err => {
       this.errores = err.error.errors as string[];
       console.error('Código del error desde el backend: ' + err.status);
       console.error(err.error.errors);
     }
   );
 }

update(): void {
 this.decretoReglamentarioService.update(this.decretoReglamentario)
   .subscribe(json => {
     this.router.navigate(['/decretosReglamentarios'])
     swal.fire('Decreto Reglamentario Actualizado', `${json.mensaje}`, 'success');
   },
     err => {
       this.errores = err.error.errors as string[];
       console.error('Código del error desde el backend: ' + err.status);
       console.error(err.error.errors);
     }
   )
}

}
