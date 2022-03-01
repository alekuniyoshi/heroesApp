import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/Interfaces/auth.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container{
    margin : 10px;
  }
  `]
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService, private heroeService: HeroesService) { }


  usuario!: Auth;

  ngOnInit(): void {
  }

  logout() {
    this.route.navigate(['/auth']);
  }


  get auth() {
    var id = localStorage.getItem('token');
    if (id != 'undefined') {
      this.authService.getUsuarioById(id!).subscribe(auth => this.usuario = auth);
    }
    return this.usuario;
  }
}
