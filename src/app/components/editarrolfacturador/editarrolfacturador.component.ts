import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FacturadorService} from 'src/app/services/facturador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarrolfacturador',
  templateUrl: './editarrolfacturador.component.html',
  styleUrls: ['./editarrolfacturador.component.scss'],
  providers: [FacturadorService,UsuarioService],
})
export class EditarrolfacturadorComponent implements OnInit {
  public token;
  public usuariosModelGetId: Usuario;

  constructor(
    private titleService: Title,
    public _usuariosService: UsuarioService,
    private _adminUsuariosService:FacturadorService,
    private router: Router
  ) { 
    this.titleService.setTitle('Editar perfil facturador');
    this.usuariosModelGetId = new Usuario("", "", "", "", "", "", 0, "", "", "", "");
    this.token = this._usuariosService.obtenerToken();
  }

  ngOnInit(): void {
    this.getUsuariosId(this._usuariosService.obtenerIdentidad()._id);
  }

  getUsuariosId(idUsuario){
    this._adminUsuariosService.obtenerRolFacturadorId(idUsuario,this._usuariosService.obtenerToken()).subscribe(
      (response)=>{
        this.usuariosModelGetId = response.usuario;
        console.log(this.usuariosModelGetId )
      },
    )
  }

  putUsuarios(){
    this._adminUsuariosService.modificarPerfilFacturador(this.usuariosModelGetId,this._usuariosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/vistarolfacturador']); 
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
