import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RegisterComponent } from './register/register.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
