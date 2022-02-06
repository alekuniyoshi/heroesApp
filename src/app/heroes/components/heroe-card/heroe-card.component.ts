import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Heroe } from '../../interfaces/heroe.interface';


@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css']
})
export class HeroeCardComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
