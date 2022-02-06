import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: ''
  }

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    if (!this.route.url.includes('update')) {
      return;
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id))).subscribe(heroe => this.heroe = heroe);
  }

  save() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      return this.heroeService.editHeroe(this.heroe).subscribe(heroe => {
        this.route.navigate(['/heroes/view', heroe.id])
      });
    }
    return this.heroeService.addHeroe(this.heroe).subscribe(heroe => {
      this.route.navigate(['/heroes/update', heroe.id]);
    });
  }

}
