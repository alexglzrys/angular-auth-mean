import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
  // Servico router, permite navegar entre rutas
  // Servicio AuthService, para registrar el usuario
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    // console.log(this.miFormulario.valid);
    // console.log(this.miFormulario.value);

    // Recuperar la información capturada en el formulario
    const { name, email, password } = this.miFormulario.value;

    // Llamar el servicio para el registro de usuarios
    this.authService.register(name, email, password).subscribe(usuarioFueRegistrado => {
      if (usuarioFueRegistrado === true) {
        // Redireccionar el usuario a Dashboard
        this.router.navigateByUrl('/dashboard');
      } else {
        // Mostrar un Alert con el error
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: usuarioFueRegistrado as string, // en este caso, la respuesta es un string, no un boolean
        })
      }
    })


  }

}
