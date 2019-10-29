import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['idUsuario', 'username', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(private UsuarioService: UsuarioService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.UsuarioService.usuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.UsuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.UsuarioService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  /*openDialog(usuario?: Usuario) {
    let men = Usuario != null ? Usuario : new Usuario();
    this.dialog.open(UsuarioDialogComponent, {
      width: '250px',
      data: men
    });*/

    openDialog(usuario: Usuario) {
      this.dialog.open(UsuarioDialogComponent, {
        data: usuario
      });
    }
  
  mostrarMas(e: any) {
    //console.log(e);
    this.UsuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
