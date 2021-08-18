import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [


  ]
})
export class ListComponent implements OnInit {

  heroesList: Heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes =>
      this.heroesList = heroes);
  }

}
