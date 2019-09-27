import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-leyes-provinciales',
  templateUrl: './leyes-provinciales.component.html'
})
export class LeyesProvincialesComponent implements OnInit {

  leyes: LeyProvincial[];



  constructor(private leyProvincialService: LeyProvincialService) { }
  //constructor (private NombreDelAtributo: Servicio) {} --> instanciar servicio

  ngOnInit() {
    this.leyProvincialService.getLeyesProvinciales().subscribe( //llama al metodo GET del Service
      leyes => this.leyes = leyes //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

  delete(leyProvincial: LeyProvincial): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la Ley ${leyProvincial.numero}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.leyProvincialService.delete(leyProvincial.id).subscribe(
          response => {
            this.leyes = this.leyes.filter(ley => ley !== leyProvincial)
            swal.fire(
              'Ley Eliminada!',
              `Ley ${leyProvincial.numero} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
