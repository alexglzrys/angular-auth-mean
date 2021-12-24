import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);

    // Redireccionar el usuario a Dashboard
    this.router.navigateByUrl('/dashboard');
  }

}
