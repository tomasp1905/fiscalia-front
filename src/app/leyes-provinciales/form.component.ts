import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public leyProvincial: LeyProvincial = new LeyProvincial();
  errores: string[];



  constructor(private leyProvincialService: LeyProvincialService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
  //  this.cargarLey(); //cargandolo acá permite visualizar los datos cuando hacemos click en EDITAR
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.leyProvincialService.getLeyProvincial(id).subscribe((leyProvincial) => this.leyProvincial = leyProvincial);
      }
    });
  }

  //metodo para buscar cliente por ID (para luego modificarlo por ejemplo con el boton EDITAR)
  cargarLey(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.leyProvincialService.getLeyProvincial(id).subscribe((leyProvincial) => this.leyProvincial = leyProvincial)
      }
    })
  }

  // Metodo para crear ley
   create(): void { //viene de <form (ngSubmit) = "create()"> --> se llama a este metodo
    this.leyProvincialService.create(this.leyProvincial).subscribe( //invoco el método que esta en el Service
      leyprovincial => {
        this.router.navigate(['/leyesProvinciales']) // la respuesta sería que una vez creado el objeto redirije al listado de leyes para mostrar la nueva ley creada
        swal.fire('Nueva Ley', `La Ley  se creó con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

update(): void {
  this.leyProvincialService.update(this.leyProvincial)
    .subscribe(json => {
      this.router.navigate(['/leyesProvinciales'])
      swal.fire('Ley Actualizada', `${json.mensaje}`, 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
}



}
