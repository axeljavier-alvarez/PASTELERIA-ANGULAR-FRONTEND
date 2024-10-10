import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';
import { Categoria } from '../models/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class TareaslibresService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  // registrarse funcion sin token
  agregarUsuario(modeloUsuario: Usuario): Observable<any> {

    let parametros = JSON.stringify(modeloUsuario);
    return this._http.post(this.url + '/agregarUsuario', parametros, {headers: this.headersVariable})
  }
  obtenerCategorias(): Observable <any> {
    return this._http.get(this.url + '/obtenerCategoriasCualquiera', { headers: this.headersVariable});
  }

  obtenerProductosCualquiera(): Observable <any> {
    return this._http.get(this.url + '/obtenerProductosCualquiera', { headers: this.headersVariable});
  }
}
