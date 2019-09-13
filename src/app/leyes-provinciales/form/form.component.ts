import { Component, OnInit } from '@angular/core';
import { LeyProvincial } from '../ley-provincial';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private leyProvincial: LeyProvincial = new LeyProvincial();

  constructor() { }

  ngOnInit() {
  }

}
