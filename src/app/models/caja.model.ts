export class Caja{
  constructor(
    public efectivoGeneral: Number,
    public vueltosCliente: Number,
    public totalEfectivoFactura: Number,

    public datosSucursal: [{
      idSucursal: string,
      nombreSucursal: string,
      direccionSucursal: string,
      telefonoSucursal: string,
      departamento: string,
      municipio: string
  }],

  public historialPedidosEfectivo: [{

      idPedido: string,
      fecha: Date,
      tipoPago: string,
      direccionEnvio: string,
      horaEntrega: string,
      metodoEnvio: string,
      descuentos: Number,
      numeroDeOrden: Number,
      estadoPedido:string,
      incrementoEnvio: Number,
      estadoOrden:string,
      horaRepartidorAsignado: Date,
      horaPedidoEntregado: Date,

      pagoEfectivo: [{
          idEfectivo: string,
          efectivoCliente: Number,
          cambioCliente:Number,
          totalPedido: Number
      }],

      repartidorAsignado: [{

          idRepartidor: string,
          nombre: string,
          apellido: string,
          email: string,
          telefono: Number,
          rol: string,
          estadoRepartidor: string
      }],


  }],

  ){}
}
