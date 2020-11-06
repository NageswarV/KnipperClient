import { BusyConfig, IBusyConfig } from 'ng-busy';
import { CustomBusyComponent } from './busy.component';

export const busyConfig: IBusyConfig = {
  backdrop: true,
  template: CustomBusyComponent,
  delay: 0,
  minDuration: 0,
  message: null
};
