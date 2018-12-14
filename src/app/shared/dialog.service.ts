import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog = (msg) => {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "390px";
    dialogConfig.position = { top: "10px" };
    dialogConfig.panelClass = "confirm-dialog-container",
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: msg
    }
    return this.dialog.open(MatConfirmDialogComponent, dialogConfig);
  }

}
