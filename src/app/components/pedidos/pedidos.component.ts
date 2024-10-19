import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteUsuarioService } from 'src/app/services/cliente-usuario.service';
import { Pedido } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';
import { Carrito } from 'src/app/models/carrito.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  providers: [UsuarioService, ClienteUsuarioService]
})
export class PedidosComponent implements OnInit {
  public token: string;
  public PedidoModelPost: Pedido;
  public CarritosModelGet: Carrito;
  public idCarrito: string;
  public municipiosOpciones: string[] = [];

  clasificacion = [
    { tipo: 'Tarjeta de crédito' },
    { tipo: 'Efectivo' },
  ]
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
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idCarrito = dataRuta.get('idCarrito');
      console.log(this.idCarrito);
    });

    this.getClienteCarrito();
  }

  getClienteCarrito() {
    this._clienteUsuarioService.verCarritoCliente(this.token).subscribe(
      (response) => {
        this.CarritosModelGet = response.carritos;
        console.log(this.CarritosModelGet);
        this.setMunicipiosOpciones();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  setMunicipiosOpciones() {
    const departamento = this.CarritosModelGet[0]?.compras[0]?.datosSucursal[0]?.departamento;

    // municipio 1
    if (departamento === 'Alta Verapaz') {
      this.municipiosOpciones = ["Cobán",
        "Santa Cruz Verapaz",
        "San Cristóbal Verapaz",
        "Tucurú",
        "Panzós",
        "Fray Bartolomé de las Casas",
        "San Pedro Carchá",
        "San Juan Chamelco",
        "La Tinta",
        "Purulhá",
        "Chisec",
        "Raxruhá",
        "San Miguel Tucurú"];
      // municipio 2
    } else if (departamento === 'Baja Verapaz') {

      this.municipiosOpciones = ["Salamá",
        "Rabinal",
        "San Miguel Chicaj",
        "Granados",
        "El Chol",
        "Purulhá"
      ];
      // municipio 3
    } else if (departamento === 'Chimaltenango') {

      this.municipiosOpciones = ["Chimaltenango",
        "San José Poaquil",
        "San Martín Jilotepeque",
        "Parramos",
        "El Tejar",
        "Yupiltepeque",
        "Acatenango",
        "Sumpango"
      ];
    }
    // municipio 4
    else if (departamento === 'Chiquimula') {

      this.municipiosOpciones = [
        "Chiquimula",
        "San José la Arada",
        "Camotán",
        "Olopa",
        "Quezaltepeque",
        "San Juan Ermita",
        "Concepción Las Minas",
        "Cabañas"
      ];
    }

    // municipio 5
    else if (departamento === 'El progreso') {

      this.municipiosOpciones = [
        "El Progreso",
        "Guastatoya",
        "San Antonio La Paz",
        "Sanarate",
        "Morazán",
        "Santa María Ixhuatán",
        "San Miguel La Paz"
      ];
    }

    // municipio 6
    else if (departamento === 'Escuintla') {

      this.municipiosOpciones = [
        "Escuintla",
        "Santa Lucía Cotzumalguapa",
        "La Democracia",
        "San José",
        "Siquinala",
        "El Guamuchil",
        "Tiquisate",
        "Palín",
        "San Vicente Pacaya",
        "Nueva Concepción",
        "San Juan Alotenango"
      ];
    }

    // municipio 7
    else if (departamento === 'Guatemala') {

      this.municipiosOpciones = [
        "Guatemala",
        "Mixco",
        "Villa Nueva",
        "San Miguel Petapa",
        "Santa Catarina Pinula",
        "San José del Golfo",
        "San Pedro Ayampuc",
        "Chinautla",
        "Palencia",
        "Fraijanes",
        "Villa Canales"
      ];
    }
    // municipio 8
    else if (departamento === 'Huehuetenango') {

      this.municipiosOpciones = [
        "Huehuetenango",
        "Chiantla",
        "Cuilco",
        "Jacaltenango",
        "Santa Bárbara",
        "La Libertad",
        "San Sebastián Huehuetenango",
        "San Juan Atitlán",
        "San Antonio Huista",
        "Todos Santos Cuchumatán",
        "San Rafael La Independencia",
        "Nenton"
      ];
    }

    // municipio 9
    else if (departamento === 'Izabal') {

      this.municipiosOpciones = [
        "Puerto Barrios",
        "Morales",
        "San Antonio",
        "Los Amates",
        "El Estor",
        "Livingston"
      ];
    }

    // municipio 10
    else if (departamento === 'Jalapa') {

      this.municipiosOpciones = [
        "Jalapa",
        "San Pedro Pinula",
        "Mataquescuintla",
        "San Luis Jilotepeque",
        "El Rosario",
        "Concepción Las Minas"
      ];
    }

    // municipio 11
    else if (departamento === 'Jutiapa') {

      this.municipiosOpciones = [
        "Jutiapa",
        "El Adelanto",
        "Agua Blanca",
        "Asunción Mita",
        "Conguaco",
        "Jerez",
        "Moyuta",
        "Pasaco",
        "San José Acatempa",
        "San Juan Bautista",
        "Santa Catarina Mita",
        "Yupiltepeque"
      ];
    }

    // municipio 12
    else if (departamento === 'Petén') {

      this.municipiosOpciones = [
        "Flores",
        "Santa Elena",
        "San Benito",
        "La Libertad",
        "San Andrés",
        "San Francisco",
        "El Chal",
        "Melchor de Mencos",
        "Dolores",
        "Poptún",
        "San Luis"
      ];
    }

    // municipio 13
    else if (departamento === 'Quetzaltenango') {

      this.municipiosOpciones = [
        "Quetzaltenango",
        "Salcajá",
        "San Mateo",
        "San Martín Sacatepéquez",
        "Almolonga",
        "Zunil",
        "Coatepeque",
        "La Esperanza",
        "Cantel",
        "Sibilia"
      ];
    }

    // municipio 14
    else if (departamento === 'Quiché') {

      this.municipiosOpciones = [
        "Santa Cruz del Quiché",
        "Chiché",
        "Zunil",
        "San Bartolomé Jocotenango",
        "San Juan Cotzal",
        "San Andrés Sajcabajá",
        "Nebaj",
        "Chajul",
        "Canillá",
        "Sacapulas",
        "Acambal",
        "Patzité"
      ];
    }

    // municipio 15
    else if (departamento === 'Retalhuleu') {

      this.municipiosOpciones = [
        "Retalhuleu",
        "San Sebastián",
        "San Martín Zapotitlán",
        "Nuevo San Carlos",
        "El Asintal",
        "Champerico"
      ];
    }

    // municipio 16
    else if (departamento === 'Sacatepéquez') {

      this.municipiosOpciones = [
        "Antigua Guatemala",
        "Ciudad Vieja",
        "San Lucas Sacatepéquez",
        "San Bartolomé Milpas Altas",
        "Santo Domingo Xenacoj",
        "San Pedro Las Huertas",
        "Alotenango"
      ];
    }

    // municipio 17
    else if (departamento === 'San Marcos') {

      this.municipiosOpciones = [
        "San Marcos",
        "San Pedro Sacatepéquez",
        "San Antonio Sacatepéquez",
        "San Miguel Ixtahuacán",
        "Concepción Tutuapa",
        "Tejutla",
        "El Tumbador",
        "Nuevo Progreso",
        "Pajapita",
        "San Rafael Pie de la Cuesta"
      ];
    }

    // municipio 18
    else if (departamento === 'Santa Rosa') {

      this.municipiosOpciones = [
        "Santa Rosa de Lima",
        "Barberena",
        "Cuilapa",
        "San Juan Tecuaco",
        "San Rafael Las Flores",
        "Casillas",
        "Pueblo Nuevo Viñas"
      ];
    }

    // municipio 19
    else if (departamento === 'Sololá') {

      this.municipiosOpciones = [
        "Solalá",
        "Panajachel",
        "San Andrés Semetabaj",
        "San José Chacayá",
        "Santa Catarina Palopó",
        "San Antonio Palopó"
      ];
    }

    // municipio 20
    else if (departamento === 'Suchitepéquez') {

      this.municipiosOpciones = [
        "Mazatenango",
        "Cuyotenango",
        "San Bernardino",
        "Santo Domingo Suchitepéquez",
        "San Gabriel",
        "Samayac",
        "San Antonio Suchitepéquez"
      ];
    }

    // municipio 21
    else if (departamento === 'Totonicapán') {

      this.municipiosOpciones = [
        "Totonicapán",
          "San Cristóbal Totonicapán",
          "San Francisco El Alto",
          "Momostenango",
          "San Andrés Xecul",
          "Santa María Chiquimula"
      ];
    }


    // municipio 22
    else if (departamento === 'Zacapa') {

      this.municipiosOpciones = [
          "Zacapa ",
          "Cabañas",
          "Chiquimula",
          "Estanzuela",
          "Gualán",
          "La Unión",
          "Río Hondo",
          "San Diego",
          "San Jorge",
          "Teculután"
      ];
    }



    else {
      this.municipiosOpciones = [];
    }
  }

  postPedido(idCarrito) {
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
