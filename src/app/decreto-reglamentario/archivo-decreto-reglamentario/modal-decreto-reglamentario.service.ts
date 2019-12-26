import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDecretoReglamentarioService {

  modal:boolean = false;

  constructor() { }

  abirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
  
}
