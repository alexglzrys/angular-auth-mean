import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  // Incializar y configurar formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

   // inyectar servicio de construcción de formularios reactivos
   // Servico router, permite navegar entre rutas
  constructor(private fb: FormBuilder,
              private router: Router,
              private authServices: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    // console.log(this.miFormulario.valid);
    // console.log(this.miFormulario.value);

    // Recuperar la información almacenada en los campos del formulario reactivo
    const { email, password } = this.miFormulario.value;

    // Llamar al servicio de login (este me retorna un booleano)
    this.authServices.login(email, password).subscribe(valido => {
      // console.log(valido);
      if (valido) {
        // Redireccionar el usuario a Dashboard
        this.router.navigateByUrl('/dashboard');
      }
    })


  }

}
