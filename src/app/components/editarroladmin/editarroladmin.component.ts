import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminUsuariosService} from 'src/app/services/admin-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editarroladmin',
  templateUrl: './editarroladmin.component.html',
  styleUrls: ['./editarroladmin.component.scss'],
  providers: [AdminUsuariosService, UsuarioService],
  
})
export class EditarroladminComponent implements OnInit {
  public token;
  public usuariosModelGetId: Usuario;


  constructor(public _usuariosService: UsuarioService,     private _adminUsuariosService:AdminUsuariosService, private router: Router
  ) {


    this.usuariosModelGetId = new Usuario("", "", "", "", "", "", 0, "", "", "", "");

    this.token = this._usuariosService.obtenerToken()

    
   }

  ngOnInit(): void {
    this.getUsuariosId(this._usuariosService.obtenerIdentidad()._id);

  }


  getUsuariosId(idUsuario){
    this._adminUsuariosService.obtenerRolGestorId(idUsuario, this._usuariosService.obtenerToken()).subscribe(

      (response)=>{
        this.usuariosModelGetId = response.usuario;
        console.log(this.usuariosModelGetId )
      },

    )
  }

  putUsuarios(){
    this._adminUsuariosService.modificarPerfilAdmin(this.usuariosModelGetId, this._usuariosService.obtenerToken()).subscribe(

      (response)=>{
        console.log(response);

        this.router.navigate(['/vistaroladmin']); 
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Usuario editado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: "Email existente",
          footer: '*Ingrese uno nuevo*',
          showConfirmButton: false,
          timer: 2500
        });
      }

    )
  }

}
