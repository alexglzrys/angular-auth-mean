import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.base_url;
  private _user!: User  // Propiead de apoyo para almacenar la informacion del usuario una vez logeado exitosamente

  // Obtener los datos del usuario
  get usuario() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  // Servicicio para login
  login(email: string, password: string): Observable<boolean | string>  {
    // Construir la URL de la petición
    const URL = `${this.baseUrl}/auth`;
    // Construir el cuerpo de la petición
    const body = { email, password };

    // Al final me interesa enviar un booleano o un string como respuesta
    return this.http.post<AuthResponse>(URL, body)
    .pipe(
      // Realizar previamente una acción secundaria con base a la respuesta del servidor
      tap(resp => {
        //console.log(resp)
        if (resp.ok) {
          // La petición es correcta en este punto, se procede a guardar el token enviado por el server en LocalStorage, para futuras validaciones y renovaciones
          localStorage.setItem('token-mean', resp.token!);

          // La petición es correcta en este punto, conservar la información del usuario logeado en nuestra variable de ayuda privada
          this._user = {
            uid: resp.uid!,
            name: resp.name!
          };
        }
      }),
      map(res => res.ok), // Retorna el valor booleano como un observable
      catchError(err => {
        console.log(err);
        return of(err.error.msg)
      })  // Atrapa cualquier error (400 | 500) generado en el server, y transformamos esa respuesta como un observable, mandando el mensaje con el error
    );
  }

  // Validar y renovar token
  validateToken(): Observable<boolean> {
    // construir URL para enviar la petición HTTP
    const URL = `${this.baseUrl}/auth/renew`;
    // construir la cabeceras necesarias para enviar en nuestra petición
    // Para validar y renovar el token, el backend espera un custom header llamado "x-token" cuyo valor es el token a validar
    // El token se recupera del LocalStorage. Sin embargo puede ser nulo, para ello envimos una cadena vacía
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token-mean') || '');

    // El guard que llamará a este servicio, solo espera un Observable de tipo boolean
    return this.http.get<AuthResponse>(URL, {headers})
      .pipe(
        map(resp => {
          // En este punto la respuesta es TRUE, ya si fuera FALSE, el server envía un status 401,
          // por tanto ese es un error, y el operador catchError lo atraparía

          // Guardar el nuevo token en LocalStorage
          localStorage.setItem('mean-token', resp.token!);
          // Volver a guardar los datos del usuario en la variable de ayuda temporal de este servicio
          this._user = {
            name: resp.name!, // Como estas propiedades en la interfaz son opcionales, es importante decirle a TS que confie en nosotros (!), ya que en este punto si existe un valor
            uid: resp.uid!
          };

          return resp.ok;
        }),
        // Si el server lanza un error (de la serie 400 | 500) debemos atraparlo
        catchError(err => of(false))
      );
  }
}
