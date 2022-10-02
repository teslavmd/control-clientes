import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';


const routes : Routes = [
  { path: '', component: TableroComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent, canActivate: [ConfiguracionGuard] },
  { path: 'config', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  { path: 'client/edit/:id', component: EditarClientesComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent},




]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
