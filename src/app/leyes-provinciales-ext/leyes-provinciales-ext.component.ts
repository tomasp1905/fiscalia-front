import { Component, OnInit } from '@angular/core';
import { LeyesProvincialesExtServiceService } from './leyes-provinciales-ext-service.service';
import { LeyProvincial } from '../leyes-provinciales/ley-provincial';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators'
import { MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-leyes-provinciales-ext',
  templateUrl: './leyes-provinciales-ext.component.html',
  styleUrls: ['./leyes-provinciales-ext.component.css']
})
export class LeyesProvincialesExtComponent implements OnInit {

  leyes: LeyProvincial[];
  titulo: string;
  termino:string;

  autocompleteControl = new FormControl();

  leyesFiltradas: Observable<LeyProvincial[]>;


  constructor(private leyProvincialServiceExt: LeyesProvincialesExtServiceService ) { }

  ngOnInit() {
      // this.leyProvincialServiceExt.getLeyesProvinciales().subscribe(
      //  leyes => this.leyes = leyes
      // );
     this.leyesFiltradas = this.autocompleteControl.valueChanges
       .pipe(
         map(value => typeof value === 'string'? value: value.titulo),
         flatMap(value =>value ?  this._filter(value): [] )
       );


  }



 private _filter(value: string): Observable<LeyProvincial[]> {
   const filterValue = value.toLowerCase();

   return this.leyProvincialServiceExt.filtrarLeyes(filterValue);
 }

 mostrarNombre(leyes?: LeyProvincial):string | undefined {
   return leyes? leyes.titulo: undefined;
 }

 seleccionarLey(event: MatAutocompleteSelectedEvent) : void {
   let leyes = event.option.value as LeyProvincial;
   console.log(leyes);


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





}
