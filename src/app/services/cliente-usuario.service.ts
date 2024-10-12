import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos.model';
import { Sucursal } from '../models/sucursal.model';
import { Carrito } from '../models/carrito.model';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteUsuarioService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );


    constructor(public _http: HttpClient) {}

    /*---------------------- SUCURSALES ------------------------*/

  //VER CATEGORIAS
  obtenerSucursales(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verTodasSucursalesRolCliente', {
      headers: headersToken,
    });
  }


  // ver productos por sucursal
  obtenerProductosPorIdSucursal(idSucursal, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(
      this.url + '/verProductosPorSucursal/' + idSucursal,
      { headers: headersToken }
    );
  }


  agregarProductoAlCarrito(modeloProducto: Producto, token): Observable<any> {
    let parametros = JSON.stringify(modeloProducto);
    let headersToken = this.headersVariable.set('Authorization',token);
    return this._http.put(this.url + '/registrarCarritoPorId/' + modeloProducto._id, parametros, { headers: headersToken });

  }



  /* carritos funcion 1 prueba */
  AgregarNuevoProducto(modeloCarrito: Carrito, token: string, idProducto: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloCarrito);

    return this._http.put(this.url + '/registrarCarritoPorId/' + idProducto, parametros, { headers: headersToken });
    
  }

  /* carritos funcion 2 prueba */
  putProductoCarrito(idProducto: String, cantidad: Number, token): Observable<any> {
    const parametros = JSON.stringify({ cantidad }); // Solo envía la cantidad
    const headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(
        this.url + '/registrarCarritoPorId/' + idProducto, parametros, { headers: headersToken }
    );
}

  obtenerProductoid(idProducto, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/verProductoPorIdRolCliente/' + idProducto, { headers: headersToken });

  }


  obtenerCarritos(token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token);
    
    return this._http.get(this.url + '/verCarritosClienteRegistrado', {headers: headersToken});
  };


  verCarritoCliente(token): Observable<any>{
    let headersToken = this.headersVariable.set ('Authorization', token);

    return this._http.get(this.url + '/verCarritosClienteRegistrado', {headers: headersToken})
  }


  /*VER CATEGORIAS GENERALES */
  obtenerCategotiasRolCliente(token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token);
    
    return this._http.get(this.url + '/getCategoriasRolCliente', {headers: headersToken});
    
  };

  obtenerRolClienteId(idUsuario, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/getUsuarioRolCliente/' + idUsuario, { headers: headersToken });
  }

  /*modificarPerfilCliente(modeloUsuarios: Usuario, token): Observable<any> {
    let parametros = JSON.stringify(modeloUsuarios);
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/editarPerfilCliente/' + modeloUsuarios._id, parametros, { headers: headersToken })
  }*/
  /* SERVICIOS PARA EDITAR PERFIL */
  modificarPerfilCliente(
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
    return this._http.put(`${this.url}/editarPerfilCliente/${modeloUsuarios._id}`, formData, { headers: headersToken });
  }

}
