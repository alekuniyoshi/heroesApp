import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login().subscribe(resp => {
      console.log(resp);
      if (resp.id) {
        this.route.navigate(['heroes/list']);
      }
    });
  }

}
