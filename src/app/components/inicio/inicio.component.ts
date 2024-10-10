import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/productos.model';
import { TareaslibresService } from 'src/app/services/tareaslibres.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [TareaslibresService]
})
export class InicioComponent implements OnInit {
  public CategoriasModelGet: Categoria;
  public ProductosModelGet: Producto;
  constructor(
    private _tareasLibresService: TareaslibresService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Inicio'); // Establece el título de la pestaña
   }
  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }
  getCategorias(){
    this._tareasLibresService.obtenerCategorias().subscribe(
      (response)=>{
        this.CategoriasModelGet = response.categorias;
        console.log(this.CategoriasModelGet);
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }
  
  getProductos(){
    this._tareasLibresService.obtenerProductosCualquiera().subscribe(
      (response)=>{
        this.ProductosModelGet = response.productos;
        console.log(this.ProductosModelGet);
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }
}