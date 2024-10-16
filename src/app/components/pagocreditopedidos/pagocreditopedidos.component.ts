import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';
import { Factura } from 'src/app/models/factura.model';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { Pedido } from 'src/app/models/pedido.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagocreditopedidos',
  templateUrl: './pagocreditopedidos.component.html',
  styleUrls: ['./pagocreditopedidos.component.scss'],
  providers: [UsuarioService, ClienteUsuarioService]
})
export class PagocreditopedidosComponent implements OnInit {

  public token: string;
  public FacturaModelPost: Factura;
  public TarjetaModelPost: Tarjeta; // Nueva variable para el modelo de tarjeta
  public PedidoModelGet:Pedido;

  constructor(
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _clienteUsuarioService: ClienteUsuarioService
  ) {
    this.titleService.setTitle('Completar pago');
    this.token = this._usuarioService.obtenerToken();

    this.FacturaModelPost = new Factura("", null,
      [{
        idUsuario: "",
        nombre: "",
        apellido: "",
        email: ""
      }],
      [{
        idPedido: "",
        fecha: null,
        tipoPago: "",
        direccionEnvio: "",
        horaEntrega: "",
        metodoEnvio: "",
        descuentos: 0,
        numeroDeOrden: 0,
      }],
      [{
        idProducto: "",
        nombreProducto: "",
        cantidad: 0,
        precio: 0,
        subTotal: 0,
        descripcionCategoria: [{
          idCategoria: "",
          nombreCategoria: "",
        }],
        datosSucursal: [{
          idSucursal: "",
          nombreSucursal: "",
          direccionSucursal: "",
          telefonoSucursal: ""
        }]
      }],
      0
    );

    // Inicializa el modelo de tarjeta
    this.TarjetaModelPost = new Tarjeta(
      "",
      0,
      0,
      "",
      0,
      0,
      0,
      ""
    );
  }

  postFactura() {
    // Verifica los datos de la tarjeta y de la factura
    console.log(this.TarjetaModelPost);
    console.log(this.FacturaModelPost); // Verifica los datos de la factura

    // Aquí podrías agregar validaciones adicionales si es necesario

    this._clienteUsuarioService.generarFacturaRolCliente(
        this.FacturaModelPost,
        this.TarjetaModelPost,
        this.token
    ).subscribe({
        next: (response: any) => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: 'Factura generada exitosamente',
                showConfirmButton: false,
                timer: 1500,
                willClose: () => {
                    window.location.reload();
                }
            });
        },
        error: (error) => {
            console.log(<any>error);
            Swal.fire({
                icon: 'error',
                title: "Error al generar la factura",
                text: error.error.mensaje || 'Datos incompletos. Por favor, revisa la información.',
                footer: '*Ingrese los datos de nuevo*',
                showConfirmButton: false,
                timer: 2500
            });
        }
    });
}

getPedidosEnEspera(){
  this._clienteUsuarioService.obtenerPedidosEnEspera(this.token).subscribe(
    (response)=>{
      this.PedidoModelGet=response.pedidos;
      console.log(this.PedidoModelGet);
    },(error)=>{
      console.log(<any>error);
    }
  )
}


  ngOnInit(): void {
    // Aquí puedes inicializar cualquier dato adicional si es necesario

    this.getPedidosEnEspera();
  }
}
