export class Sucursal {
  constructor(
    public _id: String,
    public nombreSucursal: String,
    public direccionSucursal: String,
    public telefonoSucursal: Number,
    public departamento: String,
    public municipio: String,
    public imagen: String,
    
    public datosEmpresa: {
      idEmpresa: String,
      nombreEmpresa: String,
      direccion: String,
      telefono: Number
    }[], // Debe ser un array de objetos con estas propiedades

    public gestorSucursales: {
      idUsuario: String,
      nombre: String,
      apellido: String,
      email: String,
      rol: String
    }[] // También debe ser un array de objetos con estas propiedades
  ) {}
}