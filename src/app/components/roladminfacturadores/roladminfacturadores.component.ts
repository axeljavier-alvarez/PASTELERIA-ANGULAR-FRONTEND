 import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

//LLamando al modelo
import { Usuario }  from  'src/app/models/usuarios.model';
//Llamando al servicio
import { AdminUsuariosService} from 'src/app/services/admin-usuarios.service';
//Llamando al token
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Sucursal } from 'src/app/models/sucursal.model';


@Component({
  selector: 'app-roladminfacturadores',
  templateUrl: './roladminfacturadores.component.html',
  styleUrls: ['./roladminfacturadores.component.scss'],
  providers: [AdminUsuariosService, UsuarioService]
})
export class RoladminfacturadoresComponent implements OnInit {
  public token;
  public UsuarioModelGet:Usuario;
  public UsuarioModelPost:Usuario;
  public UsuarioModelGetId: Usuario;
  public SucursalesModelGet: Sucursal[] = [];
  public campoBusqueda: string = '';
  public buscar;
  public municipios: String[] = [];
  public nombreSucursal: string = '';

  clasificacion = [
    { tipo: 'Alta Verapaz' },
    { tipo: 'Baja Verapaz' },
    { tipo: 'Chimaltenango' },
    { tipo: 'Chiquimula' },
    { tipo: 'El progreso' },
    { tipo: 'Escuintla' },
    { tipo: 'Guatemala' },
    { tipo: 'Huehuetenango' },
    { tipo: 'Izabal' },
    { tipo: 'Jalapa' },
    { tipo: 'Jutiapa' },
    { tipo: 'Petén' },
    { tipo: 'Quetzaltenango' },
    { tipo: 'Quiché' },
    { tipo: 'Retalhuleu' },
    { tipo: 'Sacatepéquez' },
    { tipo: 'San Marcos' },
    { tipo: 'Santa Rosa' },
    { tipo: 'Sololá' },
    { tipo: 'Suchitepéquez' },
    { tipo: 'Totonicapán' },
    { tipo: 'Zacapa' },
  ];

  // listado de municipios
  actualizarMunicipio(departamento: string) {
    switch (departamento) {
      case 'Alta Verapaz':
        this.municipios = [
          "Cobán",
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
          "San Miguel Tucurú"
        ];
        break; // <-- Agregado aquí

      case 'Baja Verapaz':
        this.municipios = [
          "Salamá",
          "Rabinal",
          "San Miguel Chicaj",
          "Granados",
          "El Chol",
          "Purulhá"
        ];
        break; // <-- Agregado aquí

      case 'Chimaltenango':
        this.municipios = [
          "Chimaltenango",
          "San José Poaquil",
          "San Martín Jilotepeque",
          "Parramos",
          "El Tejar",
          "Yupiltepeque",
          "Acatenango",
          "Sumpango"
        ];
        break; // <-- Aquí también

        case 'Chiquimula':
          this.municipios = [
            "Chiquimula",
            "San José la Arada",
            "Camotán",
            "Olopa",
            "Quezaltepeque",
            "San Juan Ermita",
            "Concepción Las Minas",
            "Cabañas"
          ];

      break;
      case 'El progreso':
        this.municipios = [
          "El Progreso",
          "Guastatoya",
          "San Antonio La Paz",
          "Sanarate",
          "Morazán",
          "Santa María Ixhuatán",
          "San Miguel La Paz"
        ];

    break;
    case 'Escuintla':
      this.municipios = [
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

  break;
  case 'Guatemala':
    this.municipios = [
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
break;
case 'Huehuetenango':
  this.municipios = [
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

break;
case 'Izabal':
  this.municipios = [
    "Puerto Barrios",
    "Morales",
    "San Antonio",
    "Los Amates",
    "El Estor",
    "Livingston"
  ];

break;
case 'Jalapa':
  this.municipios = [
    "Jalapa",
    "San Pedro Pinula",
    "Mataquescuintla",
    "San Luis Jilotepeque",
    "El Rosario",
    "Concepción Las Minas"
  ];

break;
case 'Jutiapa':
  this.municipios = [
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
break;
case 'Petén':
  this.municipios = [
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
break;
case 'Quetzaltenango':
  this.municipios = [
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
break;
case 'Quiché':
  this.municipios = [
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
break;
case 'Retalhuleu':
  this.municipios = [
    "Retalhuleu",
    "San Sebastián",
    "San Martín Zapotitlán",
    "Nuevo San Carlos",
    "El Asintal",
    "Champerico"
  ];
break;
case 'Sacatepéquez':
  this.municipios = [
    "Antigua Guatemala",
    "Ciudad Vieja",
    "San Lucas Sacatepéquez",
    "San Bartolomé Milpas Altas",
    "Santo Domingo Xenacoj",
    "San Pedro Las Huertas",
    "Alotenango"
  ];
break;
case 'San Marcos':
  this.municipios = [
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
break;
case 'Santa Rosa':
  this.municipios = [
    "Santa Rosa de Lima",
    "Barberena",
    "Cuilapa",
    "San Juan Tecuaco",
    "San Rafael Las Flores",
    "Casillas",
    "Pueblo Nuevo Viñas"
  ];
break;
case 'Sololá':
  this.municipios = [
    "Solalá",
    "Panajachel",
    "San Andrés Semetabaj",
    "San José Chacayá",
    "Santa Catarina Palopó",
    "San Antonio Palopó"
  ];
break;
case 'Suchitepéquez':
  this.municipios = [
    "Mazatenango",
    "Cuyotenango",
    "San Bernardino",
    "Santo Domingo Suchitepéquez",
    "San Gabriel",
    "Samayac",
    "San Antonio Suchitepéquez"
  ];
break;
case 'Totonicapán':
  this.municipios = [
    "Totonicapán",
    "San Cristóbal Totonicapán",
    "San Francisco El Alto",
    "Momostenango",
    "San Andrés Xecul",
    "Santa María Chiquimula"
  ];
break;
case 'Zacapa':
  this.municipios = [
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
break;



      // Añadir más casos según sea necesario
      default:
        this.municipios = [];
        break;
    }
  }

  constructor(
    //Nombre a servicios
    private titleService: Title,
    private _adminUsuariosService:AdminUsuariosService,
    private _usuarioService:UsuarioService
  )
  {
    //token
    this.titleService.setTitle('Rol admin facturador');
    this.token=this._usuarioService.obtenerToken();
    this.UsuarioModelPost= new Usuario("","","","","","",0,"","","","", "", "");
    this.UsuarioModelGetId = new Usuario("","","","","","",0,"","","","", "", "");

  }
  //Crear funciones para CRUDs
  getUsuariosRolFacturador(){
    this._adminUsuariosService.getUsuariosRolFacturador(this.token).subscribe(
      (response)=>{
        this.UsuarioModelGet=response.usuario;
        console.log(this.UsuarioModelGet);
      },(error)=>{
        console.log(<any>error);
      }
    )
  }

  deleteUsuarioRolFacturador(idUsuario) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se llama al servicio para eliminar
        this._adminUsuariosService.eliminarUsuarioRolFacturador(idUsuario, this.token).subscribe(
          (response) => {
            console.log(response);
            this.getUsuariosRolFacturador(); // Actualiza la lista después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El usuario ha sido eliminado exitosamente.',
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            console.log(<any>error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el usuario.',
              showConfirmButton: false,
              timer: 2500
            });
          }
        );
      }
    });
  }

    /* DE LA LINEA 397 A 472 */
    selectedImage: File | null = null;

    // Método para manejar la selección de la imagen
    onImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedImage = file; // Guarda la imagen seleccionada
      }
    }


postUsuariosRolFacturador(){

  if (!this.UsuarioModelPost || !this.nombreSucursal) {
    Swal.fire({
      icon: 'error',
      title: 'Datos incompletos',
      text: 'Por favor, complete todos los campos requeridos.',
      showConfirmButton: true
    });
    return; // Salir si no hay datos completos
  }
  const modeloSucursal = new Sucursal(
    '', // _id, puedes dejarlo vacío o asignar un valor por defecto
    this.nombreSucursal,
    '', // direccionSucursal
    0, // telefonoSucursal
    '', // departamento
    '', // municipio
    '', // imagen
    [], // datosEmpresa
    []  // gestorSucursales
  );
  const usuarioConSucursal = {
    ...this.UsuarioModelPost,
    // Puedes agregar más propiedades de modeloSucursal si es necesario
  };

  this._adminUsuariosService.agregarUsuarioRolFacturador(
    usuarioConSucursal, // Pasa el objeto que incluye los datos del usuario
    modeloSucursal, // Pasa el modelo de sucursal
    this.token,
    this.selectedImage // Asegúrate de pasar la imagen en el orden correcto
  ).subscribe(
    (response) => {
      console.log(response);
      this.getUsuariosRolFacturador();

      Swal.fire({
        icon: 'success',
        title: 'Éxito!',
        text: 'Usuario agregado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error) => {
      console.log(<any>error);
      Swal.fire({
        icon: 'error',
        title: "Datos incompletos o email existente",
        footer: '*Ingrese los datos de nuevo*',
        showConfirmButton: false,
        timer: 2500
      });
    }
  );
}


getUsuarioId(idUsuario){
  this._adminUsuariosService.obtenerRolFacturadorId(idUsuario, this.token).subscribe(
    (response)=>{
      console.log(response);

      this.UsuarioModelGetId = response.usuario;
    },
    (error)=>{
      console.log(error)

    }
  )

}

putUsuarios(){

  this._adminUsuariosService.editarRolFacturador(this.UsuarioModelGetId, this.token).subscribe(

    (response)=>{

      console.log(response);

      this.getUsuariosRolFacturador();
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Usuario editado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error) => {
      console.log(<any>error);
      Swal.fire({
        icon: 'error',
        title: "Email existente",
        footer: '*Ingrese uno nuevo*',
        showConfirmButton: false,
        timer: 2500
      });
    }
  )
}

  ngOnInit(): void {
    this.getUsuariosRolFacturador();
    this.cargarSucursales();
  }

  cargarSucursales() {
    this._adminUsuariosService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.SucursalesModelGet = response.sucursales;
        console.log(this.SucursalesModelGet)
      },(error) => {
        console.log('Error al cargar sucursales', error);
      }
    );
  }

}
