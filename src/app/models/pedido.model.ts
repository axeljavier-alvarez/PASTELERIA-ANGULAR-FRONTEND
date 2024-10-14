export class Pedido{
  constructor(
      public _id: String,
      public idUsuario: String,
      public fecha: Date,
      public tiempoEstimado: String,
      public tipoPago: String,
      public estado: String,
      public direccionEnvio: String,
      public horaEntrega: String,
      public metodoEnvio: String,
      public descuentos: Number,
      public numeroDeOrden: Number,
      public pagoConfirmado: String,
      public incrementoEnvio: Number,

      public datosUsuario: [{
        idUsuario: String,
        nombre: String,
        apellido: String,
        email: String,
        telefono: Number
      }],

      public compras:[{
        idProducto: String,
        nombreProducto: String,
        marca: String,
        cantidad: Number,
        size:String,
        precio: Number,
        subTotal: Number,

        descripcionCategoria:[{
            idCategoria: String,
            nombreCategoria: String
        }],

        datosSucursal:[{
            idSucursal:String,
            nombreSucursal: String,
            direccionSucursal: String,
            telefonoSucursal: String
        }]
    }],

      public total: Number


  ){}
}
