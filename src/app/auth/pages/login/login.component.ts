import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);
  }

}
