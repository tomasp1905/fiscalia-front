import { Component, OnInit } from '@angular/core';
import { DecretoLey } from './decretoLey';
import { DecretoLeyService } from './decreto-ley.service';
import swal from 'sweetalert2';
import { ModalDecretoLeyService } from './archivo-decreto-ley/modal-decreto-ley.service';

@Component({
  selector: 'app-decretos-ley',
  templateUrl: './decretos-ley.component.html',
  styleUrls: ['./decretos-ley.component.css']
})
export class DecretosLeyComponent implements OnInit {

  decretosLey: DecretoLey[];
  decretoLeySeleccionado: DecretoLey;
  titulo: string;
  numero: string;
  anio:string;

  constructor(private decretoLeyService: DecretoLeyService, private modalDecretoLeyService: ModalDecretoLeyService) { }

  ngOnInit() {
    this.decretoLeyService.getDecretosLey().subscribe( //llama al metodo GET del Service
      decretosLey => this.decretosLey = decretosLey //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

  delete(decretoLey: DecretoLey): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el decreto ley ${decretoLey.numero}?`,
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

        this.decretoLeyService.delete(decretoLey.id).subscribe(
          response => {
            this.decretosLey = this.decretosLey.filter(dec => dec !== decretoLey)
            swal.fire(
              'Decreto Eliminado!',
              `Decreto ${decretoLey.numero} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(decretoLey: DecretoLey) {
    this.decretoLeySeleccionado = decretoLey;
    this.modalDecretoLeyService.abirModal();
  }

  searchTitulo() {
    if (this.titulo != "") {
      this.decretosLey = this.decretosLey.filter(res => {
        return res.titulo.toLocaleLowerCase().match(this.titulo.toLocaleLowerCase());
      });
    } else if (this.titulo == "") {
      this.ngOnInit();
    }
  }

  searchNumero() {
    if (this.numero != "") {
      this.decretosLey = this.decretosLey.filter(res => {
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase());
      });
    } else if (this.numero == "") {
      this.ngOnInit();
    }
  }

  searchAnio() {
    if (this.anio != "") {
      this.decretosLey = this.decretosLey.filter(res => {
        return res.anio.toLocaleLowerCase().match(this.anio.toLocaleLowerCase());
      });
    } else if (this.anio == "") {
      this.ngOnInit();
    }
  }

}
