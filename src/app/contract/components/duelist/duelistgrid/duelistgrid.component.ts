import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchDueLists } from '../../../store/actions/duelist.action';
import { firstValueFrom, Observable } from 'rxjs';
import { DueList } from '../../../models/duelist.model';
import {
  selectDueLists,
  selectDueListLoading,
  selectDueListError,
} from '../../../store/selectors/duelist.selector';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'contract-duelist-grid',
  templateUrl: './duelistgrid.component.html',
  styleUrl: './duelistgrid.component.scss',
})
export class ContractDuelistGridComponent {
  dueLists$!: DueList[];
  loading$!: boolean;
  error$!: any;

  constructor(private store: Store, private notification: NotificationService) {
    this.store
      .select(selectDueLists)
      .subscribe((dueLists) => (this.dueLists$ = dueLists));
    this.store
      .select(selectDueListLoading)
      .subscribe((value) => (this.loading$ = value));
    this.store
      .select(selectDueListError)
      .subscribe((error) => (this.error$ = error));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchDueLists());
  }

  async showNotification() {
    this.notification.showSuccess('hello world', 'title');
    this.notification.showSuccess('hello world1');
  }
}
