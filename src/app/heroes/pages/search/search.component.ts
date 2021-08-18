import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  query: string = "";
  heroes: Heroe[] = [];
  heroeSelected: Heroe | undefined;

  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
  }

  search() {
    this.HeroesService.getSuggestions(this.query).subscribe(heroe => this.heroes = heroe);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSelected = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.query = heroe.superhero;
    this.HeroesService.getHeroeById(heroe.id!).subscribe(heroe => this.heroeSelected = heroe);
  }


}
