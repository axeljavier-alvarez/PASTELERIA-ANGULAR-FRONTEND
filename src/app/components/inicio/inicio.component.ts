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

  public categoriasModelGet: Categoria;

  constructor(
    private _tareaslibresService: TareaslibresService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Inicio');

  }

  ngOnInit(): void {
    this.getCategorias();
  }


  getCategorias(){
    this._tareaslibresService.obtenerCategorias().subscribe(
      (response)=>{
        this.categoriasModelGet = response.categorias;
        console.log(this.categoriasModelGet);
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
