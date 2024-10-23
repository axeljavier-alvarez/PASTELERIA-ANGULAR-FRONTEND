export class Caja{
  constructor(
    public efectivoGeneral: Number,
    public vueltosCliente: Number,
    public totalEfectivoFactura: Number,

    public datosSucursal: [{
      idSucursal: String,
      nombreSucursal: String,
      direccionSucursal: String,
      telefonoSucursal: String,
      departamento: String,
      municipio: String
  }],

  public historialPedidosEfectivo: [{

      idPedido: String,
      fecha: Date,
      tipoPago: String,
      direccionEnvio: String,
      horaEntrega: String,
      metodoEnvio: String,
      descuentos: Number,
      numeroDeOrden: Number,
      estadoPedido:String,
      incrementoEnvio: Number,
      estadoOrden:String,
      horaRepartidorAsignado: Date,
      horaPedidoEntregado: Date,

      pagoEfectivo: [{
          idEfectivo: String,
          efectivoCliente: Number,
          cambioCliente:Number,
          totalPedido: Number
      }],

      repartidorAsignado: [{

          idRepartidor: String,
          nombre: String,
          apellido: String,
          email: String,
          telefono: Number,
          rol: String,
          estadoRepartidor: String
      }],


  }],

  ){}
}
