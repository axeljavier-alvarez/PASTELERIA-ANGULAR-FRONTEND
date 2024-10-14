import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Pedido } from 'src/app/models/pedido.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CajeroService } from 'src/app/services/cajero.service';

@Component({
  selector: 'app-historialpedidoscajero',
  templateUrl: './historialpedidoscajero.component.html',
  styleUrls: ['./historialpedidoscajero.component.scss'],
  providers: [UsuarioService,CajeroService]
})
export class HistorialpedidoscajeroComponent implements OnInit {

  public token;
  public PedidosModelGet: Pedido;

  constructor(
    private titleService: Title,
    private _cajeroUsuarioService: CajeroService,
    private _usuarioService: UsuarioService
  ) {
    this.titleService.setTitle('Rol cajero pedidos');
    this.token = this._usuarioService.obtenerToken();
   }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(){
    this._cajeroUsuarioService.obtenerPedidos(this.token).subscribe(
      (response) => {
        this.PedidosModelGet = response.pedidos;
        console.log(this.PedidosModelGet);
      },(error) => {
        console.log(<any>error);
      }
    )
  }

}
