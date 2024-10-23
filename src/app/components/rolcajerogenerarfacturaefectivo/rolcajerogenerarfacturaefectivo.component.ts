import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CajeroService } from 'src/app/services/cajero.service';
import { Factura } from 'src/app/models/factura.model';
import { Sucursal } from 'src/app/models/sucursal.model';

import { Caja } from 'src/app/models/caja.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rolcajerogenerarfacturaefectivo',
  templateUrl: './rolcajerogenerarfacturaefectivo.component.html',
  styleUrls: ['./rolcajerogenerarfacturaefectivo.component.scss'],
  providers: [UsuarioService, CajeroService]
})
export class RolcajerogenerarfacturaefectivoComponent implements OnInit {

  public token: string;
  public idPedido: string;

  public FacturaModelPost: Factura;
  public SucursalModelPost: Sucursal;

  public CajaModelPost: Caja;


  constructor(
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _cajeroService: CajeroService,
    private router: Router,
    public _activatedRoute: ActivatedRoute,

  ) {
    this.titleService.setTitle('Generar facturas');
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

    this.SucursalModelPost = new Sucursal(
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      [
        {
          idEmpresa: '',
          nombreEmpresa: '',
          direccion: '',
          telefono: 0,
        },
      ],
      [
        {
          idUsuario: '',
          nombre: '',
          apellido: '',
          email: '',
          rol: '',
        },
      ]
    );


    this.CajaModelPost = new Caja(
      0, 0, 0,
      [{
        idSucursal: "",
        nombreSucursal: "",
        direccionSucursal: "",
        telefonoSucursal: "",
        departamento: "",
        municipio: ""
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
        estadoPedido: "",
        incrementoEnvio: 0,
        estadoOrden: "",
        horaRepartidorAsignado: null,
        horaPedidoEntregado: null,

        pagoEfectivo: [{
          idEfectivo: "",
          efectivoCliente: 0,
          cambioCliente: 0,
          totalPedido: 0
        }],

        repartidorAsignado: [{

          idRepartidor: "",
          nombre: "",
          apellido: "",
          email: "",
          telefono: 0,
          rol: "",
          estadoRepartidor: ""
        }],



      }]
    )



  }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      //this.idEmpresa = localStorage.getItem('idEmpresa'); // Asignar correctamente
      this.idPedido = dataRuta.get('idPedido'); // Asignar el idUsuario a la propiedad de la clase
      /* if (this.idPedido) {
              this.getSucursalporIdEmpresa(this.idPedido);
            } */


      // console.log(idEmpresa);

      // this.getSucursalporIdEmpresa(dataRuta.get('idEmpresa'));
      // this.getUsuariosRolGestor();

      console.log(this.idPedido);  // Deberías ver el idEmpresa correcto aquí
    });

  }

  postFacturaEfectivo(idEmpresa) {
    // Mostrar el cuadro de confirmación
    Swal.fire({
      title: '¿Está seguro que desea generar la factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, generar factura!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llamar al servicio para generar la factura
        this._cajeroService.generarFacturaPagoEfectivo(
          this.FacturaModelPost,
          this.SucursalModelPost,
          this.CajaModelPost,
          this.token,
          idEmpresa,
        )
        .subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito!',
              text: 'Factura agregada exitosamente',
              showConfirmButton: false,
              timer: 1500,
              willClose: () => {
                // Redirigir a la nueva ruta después de que Swal se cierre
                this.router.navigate(['/cajero/vistarolcajero']);
              }
            });
          },
          error: (error) => {
            console.log(<any>error);
            Swal.fire({
              icon: 'error',
              title: "Error al generar la factura",
              text: error.error.mensaje || 'Datos incompletos. Por favor, revisa la información.',
              footer: '*Inténtelo de nuevo*',
              showConfirmButton: false,
              timer: 2500
            });
          }
        });
      }
    });
  }

}
