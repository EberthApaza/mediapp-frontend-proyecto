import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/usuario';
export class UsuarioRolDTO {
    usuario: Usuario;
    listRol: Rol[];
}