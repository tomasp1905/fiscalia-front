import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private leyProvincial: LeyProvincial = new LeyProvincial();


  constructor(private leyProvincialService: LeyProvincialService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.cargarLey(); //cargandolo acá permite visualizar los datos cuando hacemos click en EDITAR
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
  public create(): void { //viene de <form (ngSubmit) = "create()"> --> se llama a este metodo
    this.leyProvincialService.create(this.leyProvincial).subscribe( //invoco el método que esta en el Service
      leyProvincial => {
        this.router.navigate(['leyesProvinciales']) // la respuesta sería que una vez creado el objeto redirije al listado de leyes para mostrar la nueva ley creada
        swal.fire('Nueva Ley', `Ley  ${leyProvincial.numero} creada con éxito`, 'success')
      }
    )
  }

  update(): void {
    this.leyProvincialService.update(this.leyProvincial)
      .subscribe(leyProvincial => {
        this.router.navigate(['/leyesProvinciales'])
        swal.fire('Ley Actualizada', `Ley ${leyProvincial.numero} actualizada con éxito!`, 'success')
      }
      )
  }


}
