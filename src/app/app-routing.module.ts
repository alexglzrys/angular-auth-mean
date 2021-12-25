import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    // Esta ruta es LazyLoad: Por tanto para protegerla con un Guard, este debe implementar las interfaces CanActivate y CanLoad
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  // Para servir la app de Angular en el mismo server del Backend, tenemos que realizar una configuración adicional al sistema de rutas
  // useHash: perimite que nuestra SPA sea compatible con cualquier navegador viejo, sin que tengamos que realizar una configuración adicional en el servidor, para que el sistema de rutas de Angular no entre en conflicto con el sistema de rutas del backend
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
