import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';
import { Pedido } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private _clienteUsuarioService: ClienteUsuarioService,
    private _router: Router,

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
    // Mostrar una alerta de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas generar el pedido?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, generar pedido',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, procede a generar el pedido
            this._clienteUsuarioService
                .agregarPedidoCliente(
                    this.PedidoModelPost,
                    this.token,
                    idCarrito,
                )
                .subscribe({
                    next: (response: any) => {
                        this._router.navigate(['/pagocreditopedidos']);

                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito!',
                            text: 'Pedido generado exitosamente',
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
                            title: "Error al generar el pedido",
                            footer: '*Ingrese los datos de nuevo*',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                });
        }
    });
}

}
