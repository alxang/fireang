import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'; */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from 'src/environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './components/app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';

import { EmployeeService } from './shared/employee.service';
import { DepartmentService } from './shared/department.service';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [
    EmployeeService,
    DepartmentService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeComponent,
    MatConfirmDialogComponent
  ]
})
export class AppModule { }
