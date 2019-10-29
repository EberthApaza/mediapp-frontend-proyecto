import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {

  menu:Menu;

  constructor(private dialogRef:MatDialogRef<MenuDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Menu, private menuService: MenuService) { }

  ngOnInit() {
    this.menu = new Menu();
    this.menu.idMenu = this.data.idMenu;
    this.menu.nombre = this.data.nombre;
    this.menu.icono = this.data.icono;
    this.menu.url = this.data.url;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.menu != null && this.menu.idMenu > 0) {    
      this.menuService.modificar(this.menu).pipe(switchMap(() => {        
        return this.menuService.listar();
      })).subscribe(menus => {        
        this.menuService.menuCambio.next(menus);
        this.menuService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      this.menuService.registrar(this.menu).pipe(switchMap(()=>{
        return this.menuService.listar();        
      })).subscribe(menus =>{
        this.menuService.menuCambio.next(menus);
        this.menuService.mensajeCambio.next('SE REGISTRO');
      });     
    }
    this.dialogRef.close();
  }

}
