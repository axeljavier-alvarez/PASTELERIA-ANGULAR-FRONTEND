import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Carrito } from 'src/app/models/carrito.model';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';

@Component({
  selector: 'app-rolclientecarrito',
  templateUrl: './rolclientecarrito.component.html',
  styleUrls: ['./rolclientecarrito.component.scss'],
  providers: [UsuarioService, ClienteUsuarioService]
})
export class RolclientecarritoComponent implements OnInit {
  public token;

  public CarritosModelGet: Carrito;


  constructor(

    private titleService: Title,


    /* instanciando el servicio */
    private _usuarioService: UsuarioService,
    private _clienteUsuarioService: ClienteUsuarioService,
  ) {
    this.titleService.setTitle('Carrito');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {


    this.getClienteCarrito();
  }


  /* FUNCIONES */
  getClienteCarrito(){
    this._clienteUsuarioService.verCarritoCliente(this.token).subscribe(
      (response) => {
        this.CarritosModelGet = response.carritos;
        console.log(this.CarritosModelGet);
      },(error) =>{
        console.log(<any>error);
      }
    )
  }

}
