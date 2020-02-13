import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDecretoReglamentario5Service {

  modalDecretoReglamentario:boolean = false;

  constructor() { }

  abrirModalDecretoReglamentario(){
    this.modalDecretoReglamentario = true;
  }

  cerrarModalDecretoReglamentario(){
    this.modalDecretoReglamentario = false;
  }

}
