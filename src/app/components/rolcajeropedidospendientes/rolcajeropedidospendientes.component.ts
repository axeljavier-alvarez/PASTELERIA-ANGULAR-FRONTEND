import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CajeroService } from 'src/app/services/cajero.service';
import { Pedido } from 'src/app/models/pedido.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rolcajeropedidospendientes',
  templateUrl: './rolcajeropedidospendientes.component.html',
  styleUrls: ['./rolcajeropedidospendientes.component.scss'],
  providers: [UsuarioService, CajeroService]
})
export class RolcajeropedidospendientesComponent implements OnInit {
  public token;
  public idSucursal;
  public PedidoModelGet: Pedido;
  public PedidoModelGetCredito: Pedido;

  constructor(
    public _activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _cajeroService: CajeroService

  ) {
    this.titleService.setTitle('Pedidos pendientes');
    this.token = this._usuarioService.obtenerToken();

   }

   ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idSucursal = localStorage.getItem('idSucursal'); // Obtener el idSucursal

      if (this.idSucursal) {
        this.getPedidosSinConfirmarEfectivo(this.idSucursal, this.token);
        this.getPedidosSinConfirmarCredito(this.idSucursal, this.token);
      }

      console.log(this.idSucursal);  // Verificar el idSucursal
    });

  }


  getPedidosSinConfirmarEfectivo( idSucursal: string, token: string) {
    this._cajeroService
      .verPedidosSinConfirmarEfectivo(idSucursal, token)
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


  getPedidosSinConfirmarCredito( idSucursal: string, token: string) {
    this._cajeroService
      .verPedidosSinConfirmarCredito(idSucursal, token)
      .subscribe(

        (response) => {
          this.PedidoModelGetCredito = response.pedidos; // Asignar los productos a la variable
          console.log(this.PedidoModelGetCredito); // Verifica la respuesta
        },

        (error) => {
          console.log(<any>error); // Manejo de errores
        }
      );
  }





}
