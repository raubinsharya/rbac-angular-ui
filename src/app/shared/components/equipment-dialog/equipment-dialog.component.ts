import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { TechnicalObjectType } from '../../../contract/models/contract-overview.model';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  fetchEquipment,
  fetchEquipmentSuccess,
} from '../../../contract/store/actions/contract-overview.action';
import { Actions, ofType } from '@ngrx/effects';
import { removeLeadingZeros } from '../../../../utils';
import { selectEquipmentLoading } from '../../../contract/store/selectors/contract-overview.selector';
import { isEmpty, remove, some } from 'lodash';
import { EquipmentType } from '../../../contract/models/equipment.model';

export interface EquipmentDialogComponentParams {
  lineNumber: string;
  technicalObjects: TechnicalObjectType[];
}

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrl: './equipment-dialog.component.scss',
})
export class EquipmentDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EquipmentDialogComponent>);
  public payload: EquipmentDialogComponentParams = inject(MAT_DIALOG_DATA);
  public technicalObjects: TechnicalObjectType[] =
    this.payload.technicalObjects;
  readonly equipmentForm = new FormControl('');
  public isEquipmentLoading!: boolean;
  public equipmentError!: string;
  selectedRows: EquipmentType[] = [];

  constructor(private store: Store, private actions$: Actions) {
    store.select(selectEquipmentLoading).subscribe((equipmentLoading) => {
      this.isEquipmentLoading = equipmentLoading;
    });
  }

  ngOnInit() {
    this.actions$.pipe(ofType(fetchEquipmentSuccess)).subscribe((action) => {
      this.equipmentForm.reset();
      this.equipmentError = '';
      if (isEmpty(action.equipments)) {
        this.equipmentError = 'No Equipment found!';
      }
      const technicalObject = action.equipments.at(0);
      const equipmentToAdd = {
        equipmentNumber: technicalObject?.equipmentNumber as string,
        mainEquipment: '',
        materialCode: technicalObject?.partNumber as string,
        materialDescription: technicalObject?.equipmentDescription as string,
        serialNumber: technicalObject?.serialNumber as string,
      };
      if (some(this.technicalObjects, equipmentToAdd)) {
        this.equipmentError = 'Equipment Already exist!';
      } else this.technicalObjects = [...this.technicalObjects, equipmentToAdd];
    });
    this.equipmentForm.valueChanges.subscribe(() => {
      this.equipmentError = '';
    });
  }

  public colDefs: ColDef[] = [
    {
      field: 'equipmentNumber',
      headerName: 'Equipment No',
      filter: true,
      sortable: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      valueFormatter: ({ value }) => removeLeadingZeros(value),
    },
    {
      field: 'materialCode',
      headerName: 'Material Code',
      filter: true,
      sortable: true,
      valueFormatter: ({ value }) => removeLeadingZeros(value),
    },
    {
      field: 'materialDescription',
      headerName: 'Material Desc.',
      filter: true,
      sortable: true,
    },
  ];

  onConfirm(): void {
    this.dialogRef.close(this.technicalObjects);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }

  addEquipment() {
    this.store.dispatch(
      fetchEquipment({ payload: this.equipmentForm.value as string })
    );
  }

  deleteEquipment() {
    const equipmentToDelete = this.selectedRows.at(0);
    this.technicalObjects = remove(
      this.technicalObjects,
      (equipment) =>
        equipment.equipmentNumber !== equipmentToDelete?.equipmentNumber
    );
  }

  handleSelectedRows(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }
}
