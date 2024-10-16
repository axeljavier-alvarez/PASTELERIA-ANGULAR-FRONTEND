import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';
import { VistarolgestorComponent } from './components/vistarolgestor/vistarolgestor.component';
import { VistaroladminComponent } from './components/vistaroladmin/vistaroladmin.component';
import { RoladmingestoresComponent } from './components/roladmingestores/roladmingestores.component';
import { VistarolfacturadorComponent } from './components/vistarolfacturador/vistarolfacturador.component';
import { RoladminfacturadoresComponent } from './components/roladminfacturadores/roladminfacturadores.component';
import { RoladminclientesComponent } from './components/roladminclientes/roladminclientes.component';
import { RoladminsucursalesComponent } from './components/roladminsucursales/roladminsucursales.component';
import { RoladminempresasComponent } from './components/roladminempresas/roladminempresas.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { RoladminfinalsucursalesComponent } from './components/roladminfinalsucursales/roladminfinalsucursales.component';
import { RolgestorcategoriasComponent } from './components/rolgestorcategorias/rolgestorcategorias.component';
import { RoladminusuariosComponent } from './components/roladminusuarios/roladminusuarios.component';
import { RoladmincategoriasyproductosComponent } from './components/roladmincategoriasyproductos/roladmincategoriasyproductos.component';
import { RoladmincateComponent } from './components/roladmincate/roladmincate.component';
import { RolgestorempresasComponent } from './components/rolgestorempresas/rolgestorempresas.component';
import { RolgestorsucursalesComponent } from './components/rolgestorsucursales/rolgestorsucursales.component';
import { RolgestorproductosComponent } from './components/rolgestorproductos/rolgestorproductos.component';
import { VerGananciasComponent } from './components/ver-ganancias/ver-ganancias.component';
import { VistarolclienteComponent } from './components/vistarolcliente/vistarolcliente.component';
import { RolclientesucursalesComponent } from './components/rolclientesucursales/rolclientesucursales.component';
import { RolclienteproductosComponent } from './components/rolclienteproductos/rolclienteproductos.component';
import { RoladminrepartidoresComponent } from './components/roladminrepartidores/roladminrepartidores.component';
import { RoladmincajerosComponent } from './components/roladmincajeros/roladmincajeros.component';
import { RolclientecarritoComponent } from './components/rolclientecarrito/rolclientecarrito.component';
import { RolclientecategoriasComponent } from './components/rolclientecategorias/rolclientecategorias.component';
import { BuscarusuariopormunicipioPipe } from './pipes/buscarusuariopormunicipio.pipe';
import { EditarrolgestorComponent } from './components/editarrolgestor/editarrolgestor.component';
import { EditarrolfacturadorComponent } from './components/editarrolfacturador/editarrolfacturador.component';
import { EditarrolcajeroComponent } from './components/editarrolcajero/editarrolcajero.component';
import { EditarrolrepartidorComponent } from './components/editarrolrepartidor/editarrolrepartidor.component';
import { EditarrolclienteComponent } from './components/editarrolcliente/editarrolcliente.component';
import { EditarroladminComponent } from './components/editarroladmin/editarroladmin.component';
import { VistarolrepartidorComponent } from './components/vistarolrepartidor/vistarolrepartidor.component';
import { VistarolcajeroComponent } from './components/vistarolcajero/vistarolcajero.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { VerpedidosclienteComponent } from './components/verpedidoscliente/verpedidoscliente.component';
import { HistorialpedidoscajeroComponent } from './components/historialpedidoscajero/historialpedidoscajero.component';
import { PagocreditopedidosComponent } from './components/pagocreditopedidos/pagocreditopedidos.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    EjemploComponent,
    VistarolgestorComponent,
    VistaroladminComponent,
    RoladmingestoresComponent,
    VistarolfacturadorComponent,
    RoladminfacturadoresComponent,
    RoladminclientesComponent,
    RoladminsucursalesComponent,
    RoladminempresasComponent,
    RoladminfinalsucursalesComponent,
    RolgestorcategoriasComponent,
    RoladminusuariosComponent,
    RoladmincategoriasyproductosComponent,
    RoladmincateComponent,
    RolgestorempresasComponent,
    RolgestorsucursalesComponent,
    RolgestorproductosComponent,
    VerGananciasComponent,
    VistarolclienteComponent,
    RolclientesucursalesComponent,
    RolclienteproductosComponent,
    RoladminrepartidoresComponent,
    RoladmincajerosComponent,
    RolclientecarritoComponent,
    RolclientecategoriasComponent,
    BuscarusuariopormunicipioPipe,
    EditarrolgestorComponent,
    EditarrolfacturadorComponent,
    EditarrolcajeroComponent,
    EditarrolrepartidorComponent,
    EditarrolclienteComponent,
    EditarroladminComponent,
    VistarolrepartidorComponent,
    VistarolcajeroComponent,
    InicioComponent,
    PedidosComponent,
    VerpedidosclienteComponent,
    HistorialpedidoscajeroComponent,
    PagocreditopedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
