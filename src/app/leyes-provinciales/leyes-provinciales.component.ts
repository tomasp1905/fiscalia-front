import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from './ley-provincial';
import { LeyProvincialService } from './ley-provincial.service';


@Component({
  selector: 'app-leyes-provinciales',
  templateUrl: './leyes-provinciales.component.html',
  styleUrls: ['./leyes-provinciales.component.css']
})
export class LeyesProvincialesComponent implements OnInit {

  leyes: LeyProvincial[];


  constructor(private leyProvincialService: LeyProvincialService ) { }
  //constructor (private NombreDelAtributo: Servicio) {} --> instanciar servicio

  ngOnInit() {
    this.leyProvincialService.getLeyesProvinciales().subscribe ( //llama al metodo GET del Service
      leyes => this.leyes = leyes //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );
  }

}
