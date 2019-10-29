import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/_model/usuario';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/usuarios`;
  //url: string = `${environment.HOST}/${environment.MICRO_CR}`;

  constructor(private http: HttpClient) { }

  listar(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Usuario[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPageable(p: number, s: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }


  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);    
    return this.http.post<Usuario[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(usuario: Usuario) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.post(this.url, usuario,{
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(usuario: Usuario) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);    
    return this.http.put(this.url, usuario,{
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idUsuario: number) {
    return this.http.delete(`${this.url}/${idUsuario}`);
  }
}
