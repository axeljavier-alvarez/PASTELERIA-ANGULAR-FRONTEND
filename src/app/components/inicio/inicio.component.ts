import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/productos.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { TareaslibresService } from 'src/app/services/tareaslibres.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [TareaslibresService]
})
export class InicioComponent implements OnInit {

  public categoriasModelGet: Categoria;
  public productosModelGet: Producto;
  public sucursalesModelGet: Sucursal;

  constructor(
    private _tareaslibresService: TareaslibresService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Inicio');

  }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
    this.getSucursales();
  }

  // VER CATEGORIAS
  getCategorias(){
    this._tareaslibresService.obtenerCategorias().subscribe(
      (response)=>{
        this.categoriasModelGet = response.categorias;
        console.log(this.categoriasModelGet);
      },(error)=>{
        console.log(<any>error);
      }
    )
  }

  // VER PRODUCTOS
  getProductos(){
    this._tareaslibresService.obtenerProductos().subscribe(
      (response)=>{
        this.productosModelGet = response.productos;
        console.log(this.categoriasModelGet);
      },(error)=>{
        console.log(<any>error);
      }
    )
  }

  // VER SUCURSALES
  getSucursales(){
    this._tareaslibresService.obtenerSucursales().subscribe(
      (response)=>{
        this.sucursalesModelGet = response.sucursales;
        console.log(this.categoriasModelGet);
      },(error)=>{
        console.log(<any>error);
      }
    )
  }

}
