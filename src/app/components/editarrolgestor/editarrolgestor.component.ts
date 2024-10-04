import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GestorUsuarioService } from 'src/app/services/gestor-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarrolgestor',
  templateUrl: './editarrolgestor.component.html',
  styleUrls: ['./editarrolgestor.component.scss'],
  providers: [GestorUsuarioService,UsuarioService],
})
export class EditarrolgestorComponent implements OnInit {
  public token;
  public usuariosModelGetId: Usuario;

  constructor(
    private titleService: Title,
    public _usuariosService: UsuarioService,
    private _adminUsuariosService:GestorUsuarioService,
    private router: Router
  ) {
    this.titleService.setTitle('Editar perfil gestor');
    this.usuariosModelGetId = new Usuario("", "", "", "", "", "", 0, "", "", "", "");
    this.token = this._usuariosService.obtenerToken();
  }

  ngOnInit(): void {
    this.getUsuariosId(this._usuariosService.obtenerIdentidad()._id);
  }

  getUsuariosId(idUsuario){
    this._adminUsuariosService.obtenerRolGestorId(idUsuario,this._usuariosService.obtenerToken()).subscribe(
      (response)=>{
        this.usuariosModelGetId = response.usuario;
        console.log(this.usuariosModelGetId )
      },
    )
  }

  putUsuarios(){
    this._adminUsuariosService.modificarPerfilGestor(this.usuariosModelGetId,this._usuariosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/vistarolgestor']); 
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Usuario editado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
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
