import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TareaslibresService } from 'src/app/services/tareaslibres.service';
import { Usuario } from 'src/app/models/usuarios.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  public UsuarioModelPost: Usuario;
  public municipios: String[] = [];
  password: string = '';
  passwordStrengthMessage: string = '';
  passwordStrengthColor: string = '#e74c3c'; // Color por defecto (rojo)
  passwordVisible: boolean = false; // Para mostrar/ocultar la contraseña

  constructor(
    private titleService: Title,
    private _tareasLibresService: TareaslibresService,
    private _router: Router
  ) {
    this.titleService.setTitle('Registro');
    this.UsuarioModelPost = new Usuario('', '', '', '', '', '', 0, '', '', '', '', '', '');
  }

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

  ngOnInit(): void {}

  // Método para actualizar la fortaleza de la contraseña
  updatePasswordStrength(): void {
    const minLength = 5;
    const hasUppercase = /[A-Z]/.test(this.password);
    const hasLowercase = /[a-z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-]/.test(this.password);

    if (this.password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      this.passwordStrengthMessage = 'Contraseña válida';
      this.passwordStrengthColor = '#2ecc71'; // Verde
    } else {
      this.passwordStrengthMessage = 'La contraseña debe tener:';
      if (this.password.length < minLength) {
        this.passwordStrengthMessage += ' al menos 5 caracteres';
      }
      if (!hasUppercase) {
        this.passwordStrengthMessage += (this.password.length < minLength ? ' ,' : '') + ' una letra mayúscula';
      }
      if (!hasLowercase) {
        this.passwordStrengthMessage += (this.password.length < minLength ? ' ,' : '') + ' una letra minúscula';
      }
      if (!hasNumber) {
        this.passwordStrengthMessage += (this.password.length < minLength ? ' ,' : '') + ' un número';
      }
      if (!hasSpecialChar) {
        this.passwordStrengthMessage += (this.password.length < minLength ? ' ,' : '') + ' un carácter especial';
      }
      this.passwordStrengthColor = '#e74c3c'; // Rojo
    }
  }

  // Método para mostrar/ocultar la contraseña
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Método para enviar el formulario
  onSubmit(event: Event): void {
    event.preventDefault();
    const minLength = 5;
    const hasUppercase = /[A-Z]/.test(this.password);
    const hasLowercase = /[a-z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-]/.test(this.password);

    if (this.password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      this.UsuarioModelPost.password = this.password; // Asigna la contraseña al modelo
      this.postUsuarios();
    } else {
      alert('Por favor, asegúrate de que la contraseña cumpla con los requisitos.');
    }
  }

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

  postUsuarios() {
    this._tareasLibresService.agregarUsuario(this.UsuarioModelPost).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Haz sido registrado(a) exitosamente',
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            this._router.navigate(['login']);
          }
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
}
