import { Injectable } from '@angular/core';
import { System, BlackoutHoldSearchFilterDto, ReportDefinitionSearchFilterDto } from '../shared/service-clients/system';

@Injectable()
export class SystemService {
  constructor(
    private systemClient: System
  ) {
  }

  public searchBlackoutHolds(filter: BlackoutHoldSearchFilterDto) {
    return this.systemClient.searchBlackoutHolds(filter);
  }

  public searchReportDefinition(filter: ReportDefinitionSearchFilterDto) {
    return this.systemClient.getReportDefinitions(filter);
  }
}
