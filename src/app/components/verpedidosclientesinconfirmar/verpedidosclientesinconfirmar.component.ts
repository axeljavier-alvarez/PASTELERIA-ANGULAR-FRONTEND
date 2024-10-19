import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Pedido } from 'src/app/models/pedido.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';


@Component({
  selector: 'app-verpedidosclientesinconfirmar',
  templateUrl: './verpedidosclientesinconfirmar.component.html',
  styleUrls: ['./verpedidosclientesinconfirmar.component.scss'],
  providers: [UsuarioService,ClienteUsuarioService]

})
export class VerpedidosclientesinconfirmarComponent implements OnInit {

  public token;
  public PedidosModelGet: Pedido;

  constructor(
    private titleService: Title,
    private _clienteUsuarioService: ClienteUsuarioService,
    private _usuarioService: UsuarioService
  ) {
    this.titleService.setTitle('Pedidos sin confirmar');
    this.token = this._usuarioService.obtenerToken();
   }

  ngOnInit(): void {

    this.getPedidosSinConfirmar();
  }


  getPedidosSinConfirmar(){
    this._clienteUsuarioService.verPedidosSinConfirmarCliente(this.token).subscribe(
      (response) => {
        this.PedidosModelGet = response.pedidos;
        console.log(this.PedidosModelGet);
      },(error) => {
        console.log(<any>error);
      }
    )
  }

}