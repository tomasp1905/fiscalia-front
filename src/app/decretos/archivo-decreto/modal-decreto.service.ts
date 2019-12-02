import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDecretoService {

  modal:boolean = false;

  constructor() { }

  abirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
  
}
