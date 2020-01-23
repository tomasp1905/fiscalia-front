import { Component, OnInit } from '@angular/core';
import { ResumenNormativo } from './resumenNormativo';
import { ResumenNormativoService } from './resumen-normativo.service';
import { ModalResumenSemanalService } from './archivo-resumen-normativo/modal-resumen-semanal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-normativo',
  templateUrl: './resumen-normativo.component.html',
  styleUrls: ['./resumen-normativo.component.css']
})
export class ResumenNormativoComponent implements OnInit {

  resumenes: ResumenNormativo[];
  resumenSeleccionado: ResumenNormativo;



  constructor(private resumenNormativoService: ResumenNormativoService, private modalResumenNormativoService: ModalResumenSemanalService) { }

  ngOnInit() {
    this.resumenNormativoService.getResumenes().subscribe( //llama al metodo GET del Service
      resumenes => this.resumenes = resumenes //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

  delete(resumen: ResumenNormativo): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el resumen?`,
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

        this.resumenNormativoService.delete(resumen.id).subscribe(
          response => {
            this.resumenes = this.resumenes.filter(res => res !== resumen)
            swal.fire(
              'Resumen Eliminado!',
              `Resumen eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(resumen: ResumenNormativo) {
    this.resumenSeleccionado = resumen;
    this.modalResumenNormativoService.abrirModal();
    console.log("Click");
  }



}
