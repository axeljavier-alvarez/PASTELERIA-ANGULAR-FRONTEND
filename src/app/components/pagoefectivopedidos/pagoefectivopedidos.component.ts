import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';
import { Factura } from 'src/app/models/factura.model';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { Pedido } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagoefectivopedidos',
  templateUrl: './pagoefectivopedidos.component.html',
  styleUrls: ['./pagoefectivopedidos.component.scss'],
  providers: [UsuarioService, ClienteUsuarioService]
})
export class PagoefectivopedidosComponent implements OnInit {

  public token: string;
  public PedidoModelPost:Pedido;
  public PedidoModelGet: Pedido;

  constructor(
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _clienteUsuarioService: ClienteUsuarioService

  ) {
    this.titleService.setTitle('Pagar con efectivo');
    this.token = this._usuarioService.obtenerToken();

    this.PedidoModelPost = new Pedido(
      "",
      "",
      [{
        idEfectivo: "",
        efectivoCliente: 0,
        cambioCliente:0,
        totalPedido: 0,
        nit: "",
      }],
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      0,
      "",
      0,
      "",
      "",
      "",
      null,
      null,
      [{
        idUsuario: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: 0
      }],
      [{
        idRepartidor: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: 0,
        rol: "",
        estadoRepartidor: ""
      }],
      [{
        idProducto: "",
        nombreProducto: "",
        marca: "",
        cantidad: 0,
        size: "",
        precio: 0,
        subTotal: 0,
        descripcionCategoria: [{
          idCategoria: "",
          nombreCategoria: ""
        }],
        datosSucursal: [{
          idSucursal: "",
          nombreSucursal: "",
          direccionSucursal: "",
          telefonoSucursal: "",
          departamento: "",
          municipio: ""
        }]
      }],
      0
    );

  }



  ngOnInit(): void {

    this.getPedidosSinConfirmar();
  }


  postConfirmarPedido() {
    // Verifica los datos de la tarjeta y de la factura
    console.log(this.PedidoModelPost); // Verifica los datos de la factura

    // Aquí podrías agregar validaciones adicionales si es necesario

    this._clienteUsuarioService.confirmarPedidoEfectivo(
      this.PedidoModelPost,
      this.token
    ).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito!',
          text: 'Pedido confirmado exitosamente',
          showConfirmButton: false,
          timer: 1500,

        });
      },
      error: (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: "Error al confirmar el pedido",
          text: error.error.mensaje || 'Datos incompletos. Por favor, revisa la información.',
          footer: '*Ingrese los datos de nuevo*',
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }


  getPedidosSinConfirmar() {
    this._clienteUsuarioService.obtenerPedidosSinConfirmarEfectivo(this.token).subscribe(
      (response) => {
        this.PedidoModelGet = response.pedidos;
        console.log(this.PedidoModelGet);
      }, (error) => {
        console.log(<any>error);
      }
    )
  }

}
