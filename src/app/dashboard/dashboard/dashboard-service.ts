import { Injectable, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs';
import { ServiceClient, ChartDataResponseDto } from '../../../generated/service-client';
import { ChartDataDto } from '../../../../service-client';

@Injectable()
export class dashboardService implements OnDestroy {

  constructor(
    private serviceClient: ServiceClient
  ) {

  }

  ngOnDestroy(): void {
  }

  GetWeeklyOrderVolumeTrends(): Observable<ChartDataResponseDto> {
    return this.serviceClient.getWeeklyOrderVolumeTrends();
  }

  GetMonthlySVLVolumeTrends(): Observable<ChartDataResponseDto[]> {
    return this.serviceClient.getMonthlySVLVolumeTrends();
  }

  Get14DayOrderEventsTrends(): Observable<ChartDataResponseDto[]> {
    return this.serviceClient.get14DayOrderEventsTrends();
  }

  GetWeeklyAODTracking() : Observable<ChartDataResponseDto>{
    return this.serviceClient.getWeeklyAODTracking();
  }

  GetWeeklyCommunicationVolumeTrends(): Observable<ChartDataResponseDto[]> {
    return this.serviceClient.getWeeklyCommunicationsVolumeTrends();
  }

  GetHandCarryMetrics(): Observable<ChartDataResponseDto[]> {
    return this.serviceClient.getHandCarryMetrics();
  }
}

