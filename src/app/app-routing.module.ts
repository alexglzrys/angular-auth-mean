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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
