import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Producto } from 'src/app/models/productos.model';
import { GestorUsuarioService } from 'src/app/services/gestor-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rolgestorinventarioproductos',
  templateUrl: './rolgestorinventarioproductos.component.html',
  styleUrls: ['./rolgestorinventarioproductos.component.scss'],
  providers: [GestorUsuarioService, UsuarioService]

})
export class RolgestorinventarioproductosComponent implements OnInit {


  public token;
  public ProductoModelGet: Producto;

  public idSucursal: string;

  constructor(
    public _activatedRoute: ActivatedRoute,

    private titleService: Title,
    private _gestorCategoriasServices: GestorUsuarioService,
    private _usuarioService: UsuarioService

  ) {
    this.titleService.setTitle('Inventario');
    this.token = this._usuarioService.obtenerToken();

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      //this.idEmpresa = localStorage.getItem('idEmpresa'); // Asignar correctamente
      this.idSucursal = dataRuta.get('idSucursal'); // Asignar el idUsuario a la propiedad de la clase

      if (this.idSucursal) {
        this.getInventario(this.idSucursal); // Usar la propiedad
      }




      console.log(this.idSucursal);
    });
  }


  getInventario(idSucursal) {
    this.
    _gestorCategoriasServices.productosInventario(idSucursal, this.token)
      .subscribe(
        (response) => {
          this.ProductoModelGet = response.productos;
          console.log(this.ProductoModelGet);
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

}
