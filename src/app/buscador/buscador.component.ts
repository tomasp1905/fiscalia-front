import { Component, OnInit, Input } from '@angular/core';
import { LeyProvincial } from '../leyes-provinciales/ley-provincial';
import { LeyProvincialService } from '../leyes-provinciales/ley-provincial.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

    leyes: LeyProvincial[];
    titulo:string;
    numero:string;
    leyesFiltradas: Observable<LeyProvincial[]>;

  constructor() { }

  ngOnInit() {
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




  }
