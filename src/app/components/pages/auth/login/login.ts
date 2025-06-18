import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styles: `
    .login-bg::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.4;
      background-image: url('/login-bg.png');
      background-size: cover;
      background-position: left center;
    }
  `
})
export class Login {

}
