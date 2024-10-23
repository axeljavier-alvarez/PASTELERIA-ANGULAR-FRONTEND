import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FacturadorService } from 'src/app/services/facturador.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Factura } from 'src/app/models/factura.model';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-rolfacturadorverfacturasefectivo',
  templateUrl: './rolfacturadorverfacturasefectivo.component.html',
  styleUrls: ['./rolfacturadorverfacturasefectivo.component.scss'],
  providers: [UsuarioService, FacturadorService]
})
export class RolfacturadorverfacturasefectivoComponent implements OnInit {

  public token: string;
  public idSucursal: string;
  public FacturaModelGet: Factura;

  constructor(
    public _activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _facturadorService: FacturadorService

  ) {
    this.titleService.setTitle('Facturas efectivo');
    this.token = this._usuarioService.obtenerToken();

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.idSucursal = localStorage.getItem('idSucursal');
      if (this.idSucursal) {
        this.getFacturasPorIdSucursal(this.idSucursal, this.token);
      }
    });
  }



  getFacturasPorIdSucursal( idSucursal: string, token: string) {
    this._facturadorService
      .obtenerFacturasPorIdSucursal(idSucursal, token)
      .subscribe(
        (response) => {
          this.FacturaModelGet = response.facturas; // Asignar los productos a la variable
          console.log(this.FacturaModelGet); // Verifica la respuesta
        },
        (error) => {
          console.log(<any>error); // Manejo de errores
        }
      );
  }

}
