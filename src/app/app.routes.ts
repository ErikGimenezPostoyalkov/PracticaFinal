import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router"
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { ProductoComponent } from './producto/producto.component';
import { BuscadorComponent } from "./buscador/buscador.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'producto/:nombre',
    component: ProductoComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'buscador',
    component: BuscadorComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
