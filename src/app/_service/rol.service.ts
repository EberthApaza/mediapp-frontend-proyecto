import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Rol } from './../_model/rol';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/roles`;
  //url: string = `${environment.HOST}/${environment.MICRO_CR}`;

  constructor(private http: HttpClient) { }

  listar(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Rol[]>(this.url, {
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
    return this.http.post<Rol[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(rol: Rol) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.post(this.url, rol,{
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(rol: Rol) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);    
    return this.http.put(this.url, rol,{
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idRol: number) {
    return this.http.delete(`${this.url}/${idRol}`);
  }
}
