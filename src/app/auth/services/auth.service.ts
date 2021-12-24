import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  // Servicicio para login
  login(email: string, password: string): Observable<AuthResponse>  {
    // Construir la URL de la petición
    const URL = `${this.baseUrl}/auth`;
    // Construir el cuerpo de la petición
    const body = { email, password };

    return this.http.post<AuthResponse>(URL, body);
  }
}
