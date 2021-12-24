import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  // Inyectar servicio para validar y renovar tokens
  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Can Activate');
      // Este servicio retorna como respuesta un Observable de tipo boolean
      return this.authService.validateToken()
        .pipe(
          // Realizar una tarea secundaria
          tap( usuarioEstaAutorizado => {
            // Si la respuesta es false, entonces redireccionamos al usuario a la ruta de auth.
            if (!usuarioEstaAutorizado) {
              this.router.navigateByUrl('/auth');
            }
          })
        );
      // Si la respuesta es TRUE, entonces dejamos pasar al usuario a ver el contenido (componente) de la ruta solicitada
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Can Load');
      // Este servicio retorna como respuesta un Observable de tipo boolean
      return this.authService.validateToken()
        .pipe(
          // Realizar una tarea secundaria
          tap( usuarioEstaAutorizado => {
            // Si la respuesta es false, entonces redireccionamos al usuario a la ruta de auth.
            if (!usuarioEstaAutorizado) {
              this.router.navigateByUrl('/auth');
            }
          })
        );
      // Si la respuesta es TRUE, entonces dejamos pasar al usuario a ver el contenido (componente) de la ruta solicitada
  }
}
