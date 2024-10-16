import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { SharedMaterialModule } from '../material.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AppBarMenuComponent } from './components/app-bar/app-bar-menu/app-bar-menu.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AgGridTableComponent } from './components/grid-table/grid-table.component';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EditableInputComponent } from './components/editable-input/editable-input.component';
import { EditableSelectComponent } from './components/editable-select/editable-select.component';
import { EditableDatePickerComponent } from './components/editable-date-picker/editable-date-picker.component';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { CustomDropDownComponent } from './components/grid/custom-drop-down/custom-drop-down.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { SimulatioLogsComponent } from './components/simulatio-logs/simulatio-logs.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { EquipmentDialogComponent } from './components/equipment-dialog/equipment-dialog.component';
import { PartDiscountComponent } from './components/part-discount/part-discount.component';
import { IncludedServicesComponent } from './components/included-services/included-services.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';

@NgModule({
  declarations: [
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    AppBarMenuComponent,
    NumberFormatterPipe,
    BreadcrumbsComponent,
    AgGridTableComponent,
    MessageDialogComponent,
    BookingDialogComponent,
    EditableInputComponent,
    EditableSelectComponent,
    CustomDropDownComponent,
    EditableDatePickerComponent,
    ConfirmationDialogComponent,
    SimulatioLogsComponent,
    EquipmentDialogComponent,
    PartDiscountComponent,
    IncludedServicesComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    FileChooserComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AgGridAngular,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule.forChild([]),
  ],
  exports: [
    FormsModule,
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    NumberFormatterPipe,
    ReactiveFormsModule,
    SharedMaterialModule,
    BreadcrumbsComponent,
    AgGridTableComponent,
    BookingDialogComponent,
    EditableInputComponent,
    MessageDialogComponent,
    EditableSelectComponent,
    CustomDropDownComponent,
    SimulatioLogsComponent,
    EquipmentDialogComponent,
    EditableDatePickerComponent,
    PartDiscountComponent,
    IncludedServicesComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    FileChooserComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
