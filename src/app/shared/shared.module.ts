import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AppBarMenuComponent } from './components/app-bar/app-bar-menu/app-bar-menu.component';
import { SharedMaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AgGridTableComponent } from './components/grid-table/grid-table.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EditableInputFieldDirective } from './directives/input-field-style.directive';
import { EditableSelectFieldDirective } from './directives/select-field-style.directive';

@NgModule({
  declarations: [
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    AppBarMenuComponent,
    BreadcrumbsComponent,
    AgGridTableComponent,
    BookingDialogComponent,
    EditableInputFieldDirective,
    EditableSelectFieldDirective,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild([]),
    AgGridAngular,
    FormsModule,
  ],
  exports: [
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    SharedMaterialModule,
    BreadcrumbsComponent,
    AgGridTableComponent,
    BookingDialogComponent,
    EditableInputFieldDirective,
    EditableSelectFieldDirective,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
