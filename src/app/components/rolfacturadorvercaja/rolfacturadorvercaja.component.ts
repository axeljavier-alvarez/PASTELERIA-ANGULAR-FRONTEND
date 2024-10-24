import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FacturadorService } from 'src/app/services/facturador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Caja } from 'src/app/models/caja.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rolfacturadorvercaja',
  templateUrl: './rolfacturadorvercaja.component.html',
  styleUrls: ['./rolfacturadorvercaja.component.scss'],
  providers: [FacturadorService, UsuarioService]

})
export class RolfacturadorvercajaComponent implements OnInit {

  public token: string;
  public idSucursal: string;
  public CajaModelGet: Caja[]; // Cambiar a un arreglo

  constructor(
    public _activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _usuarioService: UsuarioService,
    private _facturadorService: FacturadorService

  ) {
    this.titleService.setTitle('Ver caja');
    this.token = this._usuarioService.obtenerToken();
   }


   ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.idSucursal = localStorage.getItem('idSucursal');
      if (this.idSucursal) {
        this.getCajaPorSucursal(this.idSucursal, this.token);
      }
    });
  }


  getCajaPorSucursal(idSucursal: string, token: string) {
    this._facturadorService
      .verCajaPorSucursal(idSucursal, token)
      .subscribe(
        (response) => {
          this.CajaModelGet = Array.isArray(response.caja) ? response.caja : [response.caja]; // Asegúrate de que sea un arreglo
          console.log(this.CajaModelGet); // Verifica la respuesta
        },
        (error) => {
          console.log(<any>error); // Manejo de errores
        }
      );
  }

}
