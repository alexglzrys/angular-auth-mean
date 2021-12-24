import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  // Inicializar y configurar formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  // inyectar servicio de construcción de formularios reactivos
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);
  }

}
