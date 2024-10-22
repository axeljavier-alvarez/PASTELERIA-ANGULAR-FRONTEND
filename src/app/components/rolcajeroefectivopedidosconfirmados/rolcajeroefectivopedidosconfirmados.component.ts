import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CajeroService } from 'src/app/services/cajero.service';
import { Pedido } from 'src/app/models/pedido.model';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rolcajeroefectivopedidosconfirmados',
  templateUrl: './rolcajeroefectivopedidosconfirmados.component.html',
  styleUrls: ['./rolcajeroefectivopedidosconfirmados.component.scss'],
  providers: [UsuarioService, CajeroService]

})
export class RolcajeroefectivopedidosconfirmadosComponent implements OnInit {

  public token;
  public idSucursal;
  public PedidoModelGet: Pedido;

  constructor(
    public _activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _cajeroService: CajeroService

  ) {
    this.titleService.setTitle('Pedidos confirmados');
    this.token = this._usuarioService.obtenerToken();
   }

   ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idSucursal = localStorage.getItem('idSucursal'); // Obtener el idSucursal

      if (this.idSucursal) {
        this.getPedidosConfirmadosEfectivo(this.idSucursal, this.token); // Llamar al nuevo método
      }

      console.log(this.idSucursal);  // Verificar el idSucursal
    });

  }


  getPedidosConfirmadosEfectivo( idSucursal: string, token: string) {
    this._cajeroService
      .verPedidosConfirmadosEfectivo(idSucursal, token)
      .subscribe(
        (response) => {
          this.PedidoModelGet = response.pedidos; // Asignar los productos a la variable
          console.log(this.PedidoModelGet); // Verifica la respuesta
        },
        (error) => {
          console.log(<any>error); // Manejo de errores
        }
      );
  }


}
