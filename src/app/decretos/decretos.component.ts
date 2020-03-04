import { Component, OnInit } from '@angular/core';
import { Decreto } from './decreto';
import { DecretoService } from './decreto.service';
import swal from 'sweetalert2';
import { ModalDecretoService } from './archivo-decreto/modal-decreto.service';
import { ModalActualizadoDecretoService } from './archivo-actualizado-decreto/modal-actualizado-decreto.service';

@Component({
  selector: 'app-decretos',
  templateUrl: './decretos.component.html',
  styleUrls: ['./decretos.component.css']
})
export class DecretosComponent implements OnInit {

  decretos: Decreto[];
  decretoSeleccionado: Decreto;
  titulo: string;
  numero: string;
  anio:string;

  decretoSeleccionadoActualizado: Decreto;

  constructor(private decretoService: DecretoService, public modalDecretoService: ModalDecretoService, public modalActualizadoDecretoService: ModalActualizadoDecretoService) { }

  ngOnInit() {
    this.decretoService.getDecretos().subscribe( //llama al metodo GET del Service
      decretos => this.decretos = decretos //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

  delete(decreto: Decreto): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el decreto ${decreto.numero}?`,
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

        this.decretoService.delete(decreto.id).subscribe(
          response => {
            this.decretos = this.decretos.filter(dec => dec !== decreto)
            swal.fire(
              'Decreto Eliminado!',
              `Decreto ${decreto.numero} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(decreto: Decreto) {
    this.decretoSeleccionado = decreto;
    this.modalDecretoService.abirModal();
  }

  abrirModalActualizado(decreto:Decreto) {
    this.decretoSeleccionadoActualizado = decreto;
    this.modalActualizadoDecretoService.abirModalActualizado();
  }

  searchTitulo() {
    if (this.titulo != "") {
      this.decretos = this.decretos.filter(res => {
        return res.titulo.toLocaleLowerCase().match(this.titulo.toLocaleLowerCase());
      });
    } else if (this.titulo == "") {
      this.ngOnInit();
    }
  }

  searchNumero() {
    if (this.numero != "") {
      this.decretos = this.decretos.filter(res => {
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase());
      });
    } else if (this.numero == "") {
      this.ngOnInit();
    }
  }

  searchAnio() {
    if (this.anio != "") {
      this.decretos = this.decretos.filter(res => {
        return res.anio.toLocaleLowerCase().match(this.anio.toLocaleLowerCase());
      });
    } else if (this.anio == "") {
      this.ngOnInit();
    }
  }

}
