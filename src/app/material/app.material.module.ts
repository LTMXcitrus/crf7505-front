import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ]
})
export class AppMaterialModule {
}
