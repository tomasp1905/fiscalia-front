import { Component, OnInit, Input } from '@angular/core';
import { LeyesProvincialesComponent } from '../leyes-provinciales/leyes-provinciales.component';
import { LeyProvincial } from '../leyes-provinciales/ley-provincial';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  leyes: LeyProvincial[];
  titulo:string;
  numero:string;

  @Input() pruebaCom: LeyesProvincialesComponent


  constructor() { }

  ngOnInit() {
  }

  searchTitulo2(){
    this.pruebaCom.searchTitulo();
    console.log();
  }


  }
