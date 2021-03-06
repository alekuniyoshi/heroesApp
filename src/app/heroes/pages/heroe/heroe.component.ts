import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    mat-card {
      margin-top: 20px
    }
    img {
      width: 100%;
      border-radius:5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute, 
              private heroeService: HeroesService, 
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) =>
        this.heroeService.getHeroeById(id)))
      .subscribe(heroe => { this.heroe = heroe });
  }

  goBack() {
    return this.router.navigate(['/heroes/list']);
  }

}
