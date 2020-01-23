import { Component, OnInit } from '@angular/core';
import { LeyesProvincialesExtServiceService } from './leyes-provinciales-ext-service.service';
import { LeyProvincial } from '../leyes-provinciales/ley-provincial';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators'
import { MatAutocompleteSelectedEvent} from '@angular/material';
import { LeyProvincialExt } from './ley-provincial-ext';


@Component({
  selector: 'app-leyes-provinciales-ext',
  templateUrl: './leyes-provinciales-ext.component.html',
  styleUrls: ['./leyes-provinciales-ext.component.css']
})
export class LeyesProvincialesExtComponent implements OnInit {

  leyes: LeyProvincial[];
//  titulo: string;

  autocompleteControlPorTitulo = new FormControl();
  autocompleteControlPorNumero = new FormControl();

  leyesFiltradasPorTitulo: Observable<LeyProvincial[]>;
  leyesFiltradasPorNumero: Observable<LeyProvincial[]>;

  leyProvincialExt: LeyProvincialExt = new LeyProvincialExt();


  constructor(private leyProvincialServiceExt: LeyesProvincialesExtServiceService ) { }

  ngOnInit() {
     this.leyesFiltradasPorTitulo = this.autocompleteControlPorTitulo.valueChanges
       .pipe(
         map(value => typeof value === 'string'? value: value.titulo),
         flatMap(value =>value ?  this._filterPorTitulo(value): [] )
       );

       this.leyesFiltradasPorNumero = this.autocompleteControlPorNumero.valueChanges
         .pipe(
           map(value => typeof value === 'string'? value: value.numero),
           flatMap(value =>value ?  this._filterPorNumero(value): [] )
         );

  }


 private _filterPorTitulo(value: string): Observable<LeyProvincial[]> {
   const filterValue = value.toLowerCase();

   return this.leyProvincialServiceExt.filtrarLeyesPorTitulo(filterValue);
 }

 private _filterPorNumero(value: string): Observable<LeyProvincial[]> {
   return this.leyProvincialServiceExt.filtrarLeyesPorNumero(value);
 }

 mostrarNombrePorTitulo(leyes?: LeyProvincial):string | undefined {
   return leyes? leyes.titulo: undefined;
 }

 seleccionarLeyPorTitulo(event: MatAutocompleteSelectedEvent) : void {
   let ley = event.option.value as LeyProvincial;
   console.log(ley);
   this.leyProvincialExt.listaDeLeyes.push(ley);

   this.autocompleteControlPorTitulo.setValue('');
   event.option.focus();
   event.option.deselect();

 }

 mostrarNombrePorNumero(leyes?: LeyProvincial):string | undefined {
   return leyes? leyes.numero: undefined;
 }

 seleccionarLeyPorNumero(event: MatAutocompleteSelectedEvent) : void {
   let ley = event.option.value as LeyProvincial;
   console.log(ley);
   this.leyProvincialExt.listaDeLeyes.push(ley);

   this.autocompleteControlPorNumero.setValue('');
   event.option.focus();
   event.option.deselect();

 }


}
