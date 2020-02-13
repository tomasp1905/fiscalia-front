import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';
import swal from 'sweetalert2';
import { ModalService } from './archivo/modal.service';
import { AuthService } from '../usuarios/auth.service';
import { ModalActualizadoService } from './archivo-actualizado/modal-actualizado.service';
import { DecretoReglamentario } from './decretos-reglamentarios/decretosReglamentarios';
import { ModalDecRegService } from './decretos-reglamentarios/modal-dec-reg.service';
import { ModalDecretoReglamentarioService } from './archivo-decreto-reglamentario/modal-decreto-reglamentario.service';
import { ModalDecretoReglamentario2Service } from './archivo-decreto-reglamentario2/modal-decreto-reglamentario2.service';
import { ModalDecretoReglamentario3Service } from './archivo-decreto-reglamentario3/modal-decreto-reglamentario3.service';
import { ModalDecretoReglamentario4Service } from './archivo-decreto-reglamentario4/modal-decreto-reglamentario4.service';
import { ModalDecretoReglamentario5Service } from './archivo-decreto-reglamentario5/modal-decreto-reglamentario5.service';
import { ModalDecretoReglamentario6Service } from './archivo-decreto-reglamentario6/modal-decreto-reglamentario6.service';



@Component({
  selector: 'app-leyes-provinciales',
  templateUrl: './leyes-provinciales.component.html',
  styleUrls: ['./leyes-provinciales.css']
})
export class LeyesProvincialesComponent implements OnInit {

  leyes: LeyProvincial[];

  leyProvincialSeleccionada: LeyProvincial; //MODAL
  leyProvincialSeleccionadaActualizada: LeyProvincial //MODAL ACTUALIZADO

  leyProvincialSeleccionadaParaDecretoReglamentario:LeyProvincial
  leyProvincialSeleccionadaParaDecretoReglamentario2:LeyProvincial
  leyProvincialSeleccionadaParaDecretoReglamentario3:LeyProvincial
  leyProvincialSeleccionadaParaDecretoReglamentario4:LeyProvincial
  leyProvincialSeleccionadaParaDecretoReglamentario5:LeyProvincial
  leyProvincialSeleccionadaParaDecretoReglamentario6:LeyProvincial

  titulo: string;
  numero: string;

  //constructor (private NombreDelAtributo: Servicio) {} --> instanciar servicio
  constructor(private leyProvincialService: LeyProvincialService, private modalService: ModalService, public authService: AuthService, private modalActualizadoService:ModalActualizadoService, private modalDecRegService: ModalDecretoReglamentarioService,
  private modalDecRegService2: ModalDecretoReglamentario2Service, private modalDecRegService3: ModalDecretoReglamentario3Service,private modalDecRegService4: ModalDecretoReglamentario4Service,
  private modalDecRegService5: ModalDecretoReglamentario5Service, private modalDecRegService6: ModalDecretoReglamentario6Service) { }


  ngOnInit() {
     this.leyProvincialService.getLeyesProvinciales().subscribe(
      leyes => this.leyes = leyes
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

  abrirModal(ley: LeyProvincial) {
    this.leyProvincialSeleccionada = ley;
    this.modalService.abirModal();
  }

  abrirModalActualizado(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaActualizada = ley;
    this.modalActualizadoService.abirModalActualizado();
  }

  abrirModalDecretoReglamentario(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario = ley;
    this.modalDecRegService.abrirModalDecretoReglamentario();
  }

  abrirModalDecretoReglamentario2(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario2 = ley;
    this.modalDecRegService2.abrirModalDecretoReglamentario();
  }

  abrirModalDecretoReglamentario3(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario3 = ley;
    this.modalDecRegService3.abrirModalDecretoReglamentario();
  }

  abrirModalDecretoReglamentario4(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario4 = ley;
    this.modalDecRegService4.abrirModalDecretoReglamentario();
  }

  abrirModalDecretoReglamentario5(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario5 = ley;
    this.modalDecRegService5.abrirModalDecretoReglamentario();
  }

  abrirModalDecretoReglamentario6(ley:LeyProvincial) {
    this.leyProvincialSeleccionadaParaDecretoReglamentario6 = ley;
    this.modalDecRegService6.abrirModalDecretoReglamentario();
  }



  searchTitulo() {
    if (this.titulo != "") {
      this.leyes = this.leyes.filter(res => {
        return res.titulo.toLocaleLowerCase().match(this.titulo.toLocaleLowerCase());
      });
    } else if (this.titulo == "") {
      this.ngOnInit();
    }

  }

  searchNumero() {
    if (this.numero != "") {
      this.leyes = this.leyes.filter(res => {
        return res.numero.match(this.numero);
      });
    } else if (this.numero == "") {
      this.ngOnInit();
    }

  }



}
