import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/_model/menu';
import { MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dataSource: MatTableDataSource<Menu>;
  displayedColumns = ['idMenu', 'nombre', 'icono', 'url', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(private menuService: MenuService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.menuService.menuCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.menuService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  openDialog(menu?: Menu) {
    let men = menu != null ? menu : new Menu();
    this.dialog.open(MenuDialogComponent, {
      width: '250px',
      data: men
    });
  }

  mostrarMas(e: any) {
    //console.log(e);
    this.menuService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
