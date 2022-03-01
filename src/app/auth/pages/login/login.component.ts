import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../Interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authAux!: Auth;

  constructor(private route: Router, private auth: AuthService) { }

  loginFormControl = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  login() {
    let email = this.loginFormControl.value.emailFormControl.trim();
    let password = this.loginFormControl.value.passwordFormControl.trim();

    this.auth.login(email, password).subscribe(resp => {
      this.authAux = resp;
      localStorage.setItem('token', this.authAux.id);
      this.route.navigate(['heroes/list']);
    });
  }

}
