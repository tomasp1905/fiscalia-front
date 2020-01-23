import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators'

import { Decreto } from '../decretos/decreto';
import { DecretoExt } from './decreto-ext';
import { DecretoExtService } from './decreto-ext.service';

@Component({
  selector: 'app-decretos-ext',
  templateUrl: './decretos-ext.component.html',
  styleUrls: ['./decretos-ext.component.css']
})
export class DecretosExtComponent implements OnInit {

  decretos: Decreto[];
  titulo: string;
  anio:string;

  autocompleteControlPorTitulo = new FormControl();
  autocompleteControlPorAnio = new FormControl();
  autocompleteControlPorNumero = new FormControl();

  decretosFiltradosPorTitulo: Observable<Decreto[]>;
  decretosFiltradosPorAnio: Observable<Decreto[]>;
  decretosFiltradosPorNumero: Observable<Decreto[]>;

  decretoExt: DecretoExt = new DecretoExt();


  constructor(private decretoServiceExt: DecretoExtService) { }

  ngOnInit() {
    this.decretosFiltradosPorTitulo = this.autocompleteControlPorTitulo.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.titulo),
        flatMap(value =>value ?  this._filterPorTitulo(value): [] )
      );

    this.decretosFiltradosPorAnio = this.autocompleteControlPorAnio.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.anio),
        flatMap(value =>value ?  this._filterAnio(value): [] )
      );

      this.decretosFiltradosPorNumero = this.autocompleteControlPorNumero.valueChanges
        .pipe(
          map(value => typeof value === 'string'? value: value.numero),
          flatMap(value =>value ?  this._filterNumero(value): [] )
        );
  }

  private _filterPorTitulo(value: string): Observable<Decreto[]> {
    const filterValue = value.toLowerCase();

    return this.decretoServiceExt.filtrarDecretos(filterValue);
  }

  private _filterAnio(value: string): Observable<Decreto[]> {
    return this.decretoServiceExt.filtrarDecretosPorAnio(value);
  }

  private _filterNumero(value: string): Observable<Decreto[]> {
    return this.decretoServiceExt.filtrarDecretosPorNumero(value);
  }

  mostrarNombrePorTitulo(decretos?: Decreto):string | undefined {
    return decretos? decretos.titulo: undefined;
  }

  mostrarNombrePorAnio(decretos?: Decreto):string | undefined {
    return decretos? decretos.anio: undefined;
  }

  mostrarNombrePorNumero(decretos?: Decreto):string | undefined {
    return decretos? decretos.numero: undefined;
  }

  seleccionarDecretoPorTitulo(event: MatAutocompleteSelectedEvent) : void {
    let decreto = event.option.value as Decreto;
    console.log(decreto);
    this.decretoExt.listaDeDecretos.push(decreto);

    this.autocompleteControlPorTitulo.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  seleccionarDecretoPorAnio(event: MatAutocompleteSelectedEvent) : void {
    let decreto = event.option.value as Decreto;
    console.log(decreto);
    this.decretoExt.listaDeDecretos.push(decreto);

    this.autocompleteControlPorAnio.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  seleccionarDecretoPorNumero(event: MatAutocompleteSelectedEvent) : void {
    let decreto = event.option.value as Decreto;
    console.log(decreto);
    this.decretoExt.listaDeDecretos.push(decreto);

    this.autocompleteControlPorNumero.setValue('');
    event.option.focus();
    event.option.deselect();

  }

}
