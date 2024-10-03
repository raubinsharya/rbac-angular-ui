import { Component, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Log,
  SimulationErrorLogs,
} from '../../../contract/models/contract-overview.model';

export interface SimulationLogsComponentInterface {
  simulationLogs: SimulationErrorLogs;
  simulationStatus: string;
  isSimulation: string;
}

@Component({
  selector: 'app-simulatio-logs',
  templateUrl: './simulatio-logs.component.html',
  styleUrl: './simulatio-logs.component.scss',
})
export class SimulatioLogsComponent {
  private readonly dialogRef = inject(MatDialogRef<SimulatioLogsComponent>);
  public successLogs: Array<Log>;
  public infoLogs: Array<Log>;
  public warningLogs: Array<Log>;
  public errorLogs: Array<Log>;
  public simulationStatus!: string;
  public isSimulation!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public payload: SimulationLogsComponentInterface
  ) {
    this.successLogs = payload.simulationLogs?.successLogs;
    this.infoLogs = payload.simulationLogs?.infoLogs;
    this.warningLogs = payload.simulationLogs?.warningLogs;
    this.errorLogs = payload.simulationLogs?.errorLogs;
    this.simulationStatus = payload.simulationStatus;
    this.isSimulation = payload.isSimulation;
  }

  onConfirm(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
