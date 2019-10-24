import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';
import swal from 'sweetalert2';
import { ModalService } from './archivo/modal.service';
import { AuthService } from '../usuarios/auth.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-leyes-provinciales',
  templateUrl: './leyes-provinciales.component.html',
  styleUrls: ['./leyes-provinciales.css']
})
export class LeyesProvincialesComponent implements OnInit {

  leyes: LeyProvincial[];
  leyProvincialSeleccionada:LeyProvincial; //MODAL
  titulo:string;
  numero:string;
  paginador: any;

  autocompleteControl = new FormControl();

  leyesFiltradas: Observable<LeyProvincial[]>; 


//constructor (private NombreDelAtributo: Servicio) {} --> instanciar servicio
  constructor(private leyProvincialService: LeyProvincialService, private modalService: ModalService, private authService: AuthService, private activatedRoute:ActivatedRoute) { }


  ngOnInit() {
  //  this.leyProvincialService.getLeyesProvinciales().subscribe( //llama al metodo GET del Service
  //    leyes => this.leyes = leyes //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
  //

  this.activatedRoute.paramMap.subscribe(params => {
    let page: number = +params.get('page');

    if (!page) {
      page = 0;
    }

    this.leyProvincialService.getLeyes(page)
      .pipe(
        tap(response => {
          console.log('ClientesComponent: tap 3');
          (response.content as LeyProvincial[]).forEach(ley => console.log(ley.titulo));
        })
      ).subscribe(response => {
        this.leyes = response.content as LeyProvincial[];
        this.paginador = response;
      });
  });

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



  abrirModal(ley: LeyProvincial){
    this.leyProvincialSeleccionada = ley;
    this.modalService.abirModal();
  }

  searchTitulo(){
    if(this.titulo != ""){
      this.leyes = this.leyes.filter(res=>{
        return res.titulo.toLocaleLowerCase().match(this.titulo.toLocaleLowerCase());
      });
    }else if(this.titulo == ""){
      this.ngOnInit();
    }

  }

  searchNumero() {
    if(this.numero != ""){
      this.leyes = this.leyes.filter(res=>{
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase());
      });
    }else if(this.numero == ""){
      this.ngOnInit();
    }

  }

  }
