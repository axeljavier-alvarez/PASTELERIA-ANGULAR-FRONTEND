import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class CajeroService {


  public url: String = 'http://localhost:3000/api';

  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad;
  public token;
  // public idEmpresa;

  constructor(public _http: HttpClient) { }

  obtenerRolCajeroId(idUsuario, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/getRolIdCajero/' + idUsuario, { headers: headersToken });
  }

  /*modificarPerfilCajero(modeloUsuarios: Usuario, token): Observable<any> {
    let parametros = JSON.stringify(modeloUsuarios);
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/editarPerfilCajero/' + modeloUsuarios._id, parametros, { headers: headersToken })

  }*/

  /* SERVICIOS PARA EDITAR PERFIL */
  modificarPerfilCajero(
    modeloUsuarios: Usuario,
    token: string,
    imagen?: File // Añadido el parámetro de imagen
  ): Observable<any> {

    const formData = new FormData();

    // Agregar los campos de usuario al FormData
    formData.append('nombre', String(modeloUsuarios.nombre || ''));
    formData.append('apellido', String(modeloUsuarios.apellido || ''));
    formData.append('email', String(modeloUsuarios.email || ''));
    formData.append('telefono', modeloUsuarios.telefono != null ? modeloUsuarios.telefono.toString() : '0');
    formData.append('direccion', String(modeloUsuarios.direccion || ''));
    formData.append('departamento', String(modeloUsuarios.departamento || ''));
    formData.append('municipio', String(modeloUsuarios.municipio || ''));

    // Si se proporciona una imagen, añadirla a FormData
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    const headersToken = new HttpHeaders().set('Authorization', token);

    // Realizar la petición PUT
    return this._http.put(`${this.url}/editarPerfilCajero/${modeloUsuarios._id}`, formData, { headers: headersToken });
  }

  // VER PEDIDOS
  obtenerPedidos(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verPedidosRolCajero', { headers: headersToken });
  }

}
