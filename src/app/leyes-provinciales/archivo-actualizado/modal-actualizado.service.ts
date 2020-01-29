import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActualizadoService {

  modalActualizado:boolean = false;


  constructor() { }

  abirModalActualizado(){
    this.modalActualizado = true;
  }

  cerrarModalActualizado(){
    this.modalActualizado = false;
  }
}
