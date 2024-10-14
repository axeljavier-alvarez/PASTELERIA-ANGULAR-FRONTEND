import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';
import { Pedido } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  providers: [UsuarioService, ClienteUsuarioService]

})

export class PedidosComponent implements OnInit {

  public token;
  public PedidoModelPost: Pedido;

  public idCarrito: string;


  constructor(
    public _activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _clienteUsuarioService: ClienteUsuarioService

  ) {
    this.titleService.setTitle('Pedidos');
    this.token = this._usuarioService.obtenerToken();
    this.PedidoModelPost = new Pedido(
      "",
      "",
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
      [{
        idUsuario: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: 0
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
        datosSucursal:[{
          idSucursal:"",
          nombreSucursal: "",
          direccionSucursal: "",
          telefonoSucursal: ""
      }]
      }],

      0
    )
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      //this.idEmpresa = localStorage.getItem('idEmpresa'); // Asignar correctamente
      this.idCarrito = dataRuta.get('idCarrito'); // Asignar el idUsuario a la propiedad de la clase

     /* if (this.idEmpresa) {
        this.getSucursalporIdEmpresa(this.idEmpresa);
      } */


      // console.log(idEmpresa);

      // this.getSucursalporIdEmpresa(dataRuta.get('idEmpresa'));
     // this.getUsuariosRolGestor();

      console.log(this.idCarrito);  // Deberías ver el idEmpresa correcto aquí
    });
  }



  // metodos
  postPedido(idCarrito) {
    this._clienteUsuarioService
      .agregarPedidoCliente(
        this.PedidoModelPost,
        this.token,
        idCarrito,
      )
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Pedido generado exitosamente',
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              // Recarga la página después de que el Swal se cierre
              window.location.reload();
            }
          });
        },
        error: (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: "Error al generar el pedido",
            footer: '*Ingrese los datos de nuevo*',
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
  }

}
