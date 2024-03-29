import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule,
  // MatFormFieldModule, MatInputModule, MatOptionModule,
  //  MatDividerModule,
  // MatSelectModule, MatButtonModule, 
  // MatSnackBarModule, MatDatepickerModule,
  // MatToolbarModule, MatTableModule, MatDialogModule,
  // MatPaginatorModule, MatNativeDateModule , MatMenuModule,
  // MatGridListModule 
} from '@angular/material';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    // FormsModule,
    // HttpClientModule,
    // AppRoutingModule,

    // MatToolbarModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatOptionModule,
    // MatSelectModule,
    MatIconModule,
    // MatButtonModule,
    MatCardModule,
    // MatTableModule,
    // MatDividerModule,
    // MatSnackBarModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatCheckboxModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatGridListModule,
    // MatMenuModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ]),
  ]
})
export class DashboardModule { }
