import { Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["fullName", "email", "mobile", "city", "departmentName", "actions"];
  faTrash = faTrash;
  faEdit = faEdit;
  searchKey: string;

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) { }
  
  onSearchClear = () => {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter = () => {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  openModal = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onCreate = () => {
    this.service.initializeFormGroup();
    this.openModal();
  }

  onEdit = row => {
    row.hireDate = new Date(row.hireDate);
    this.service.populateForm(row);
    this.openModal();
  }

  onDelete = $key => {
    /* if (confirm("Are you sure to delete this record?")) {
      this.service.deleteEmployee($key);
      this.notificationService.warn('! Deleted Successfully')
    } */

    this.dialogService.openConfirmDialog("Are you sure to delete this record?")
    .afterClosed()
    .subscribe(res => {
      if (res) {
        this.service.deleteEmployee($key);
        this.notificationService.warn('! Deleted Successfully')
      }
    });
  }

  ngOnInit() {
    this.service.getEmployees()
      .subscribe(
        actionArray => {
          let list = actionArray.map(item => {
            let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department'])
            return {
              $key: item.key,
              departmentName,
              ...item.payload.val()
            }
          });
          this.listData = new MatTableDataSource(list);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != "actions" && data[ele].toLowerCase().indexOf(filter) != -1;
            })
          }
        }
      );
  }

}
