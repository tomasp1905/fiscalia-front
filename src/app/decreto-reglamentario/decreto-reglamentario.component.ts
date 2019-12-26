import { Component, OnInit } from '@angular/core';
import { DecretoReglamentario } from './decretoReglamentario';
import { DecretoReglamentarioService } from './decreto-reglamentario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ModalDecretoReglamentarioService } from './archivo-decreto-reglamentario/modal-decreto-reglamentario.service';

@Component({
  selector: 'app-decreto-reglamentario',
  templateUrl: './decreto-reglamentario.component.html',
  styleUrls: ['./decreto-reglamentario.component.css']
})
export class DecretoReglamentarioComponent implements OnInit {

  decretosReglamentarios: DecretoReglamentario[];
  decretoReglamentarioSeleccionado: DecretoReglamentario;
  numero: string;
  anio:string;

  constructor(private decretoReglamentarioService: DecretoReglamentarioService, private modalDecretoReglamentarioService: ModalDecretoReglamentarioService) { }

  ngOnInit() {
    this.decretoReglamentarioService.getDecretosReglamentarios().subscribe( //llama al metodo GET del Service
      decretosReglamentarios => this.decretosReglamentarios = decretosReglamentarios //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

  delete(decretoReglamentario: DecretoReglamentario): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el decreto reglamentario ${decretoReglamentario.numero}?`,
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

        this.decretoReglamentarioService.delete(decretoReglamentario.id).subscribe(
          response => {
            this.decretosReglamentarios = this.decretosReglamentarios.filter(decReg => decReg !== decretoReglamentario)
            swal.fire(
              'Decreto Eliminado!',
              `Decreto Reglamentario ${decretoReglamentario.numero} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(decretoReglamentario: DecretoReglamentario) {
    this.decretoReglamentarioSeleccionado = decretoReglamentario;
    this.modalDecretoReglamentarioService.abirModal();
  }

  searchNumero() {
    if (this.numero != "") {
      this.decretosReglamentarios = this.decretosReglamentarios.filter(res => {
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase());
      });
    } else if (this.numero == "") {
      this.ngOnInit();
    }
  }

  searchAnio() {
    if (this.anio != "") {
      this.decretosReglamentarios = this.decretosReglamentarios.filter(res => {
        return res.anio.toLocaleLowerCase().match(this.anio.toLocaleLowerCase());
      });
    } else if (this.anio == "") {
      this.ngOnInit();
    }
  }

}
