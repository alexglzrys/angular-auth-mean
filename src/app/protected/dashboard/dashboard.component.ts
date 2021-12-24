import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
    * {
      margin: 1rem;
    }
    button {
      outline: none !important;
      border: none;
      background: linear-gradient(90deg, rgba(96,207,220,1) 0%, rgba(190,52,218,1) 92%);
      color: white;
      border-radius: 5px;
      width: 100px;
      padding: 10px;
    }
    button:hover {
      cursor: pointer;
    }
    `
  ]
})
export class DashboardComponent implements OnInit {

  // Recuperar la información del usuario almacenada en la variable de ayuda, declarada en el servicio de autenticación (getter)
  get usuario() {
    // Esta información solo esta disponible si el usuario hizo login previamente, pero si el usuario recargo la página del navegador, estará vacia. Por tantp
    // es necesario persistirla de alguna forma.
    // Para ello se tiene en localStorage el token, para volver a validarlo y renovarlo.
    return this.authService.usuario;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    // Redireccionar al usuario al login
    this.router.navigateByUrl('/login');
  }

}
