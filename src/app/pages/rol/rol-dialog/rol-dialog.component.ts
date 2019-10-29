import { switchMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rol } from 'src/app/_model/rol';
import { Component, OnInit, Inject } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.css']
})
export class RolDialogComponent implements OnInit {

  rol:Rol;

  constructor(private dialogRef:MatDialogRef<RolDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Rol, private rolService: RolService) { }

  ngOnInit() {
    this.rol = new Rol();
    this.rol.idRol = this.data.idRol;
    this.rol.nombre = this.data.nombre;
    this.rol.descripcion = this.data.descripcion;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.rol != null && this.rol.idRol > 0) {    
      this.rolService.modificar(this.rol).pipe(switchMap(() => {        
        return this.rolService.listar();
      })).subscribe(rols => {        
        this.rolService.rolCambio.next(rols);
        this.rolService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      this.rolService.registrar(this.rol).pipe(switchMap(()=>{
        return this.rolService.listar();        
      })).subscribe(rols =>{
        this.rolService.rolCambio.next(rols);
        this.rolService.mensajeCambio.next('SE REGISTRO');
      });     
    }
    this.dialogRef.close();
  }

}
