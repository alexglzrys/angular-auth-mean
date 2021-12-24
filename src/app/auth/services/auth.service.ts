import { HttpClient } from '@angular/common/http';
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
          // Si la petición es correcta, conservar la información del usuario en nuestra variable de ayuda privada
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
}
