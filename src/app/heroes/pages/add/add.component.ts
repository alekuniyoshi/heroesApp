import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
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

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute,
    private route: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

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
        this.showSnackBar('Hereo modifided');
        this.route.navigate(['/heroes/view', heroe.id]);
      });
    }
    return this.heroeService.addHeroe(this.heroe).subscribe(heroe => {
      this.showSnackBar('Hereo added');
      this.route.navigate(['/heroes/view', heroe.id]);
    });
  }


  delete() {
    if (this.heroe.id) {
      const id = this.heroe.id;
      const dialog = this.dialog.open(ConfirmComponent, { width: '250px', data: this.heroe });
      dialog.afterClosed().subscribe((result) => {
        if (result) {
          return this.heroeService.deleteHeroe(id).subscribe(value => {
            this.showSnackBar('Hereo deleted');
            this.route.navigate(['heroes/list'])
          });
        } else {
          return;
        }
      });
    }
    return;
  }

  showSnackBar(messsage: string) {
    this.snackBar.open(messsage, 'Close', { duration: 2500 });
  }
}
