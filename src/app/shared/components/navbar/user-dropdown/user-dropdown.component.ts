import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth.service';
import { SecurityService } from '../../../../core/security.service';
import { ClientService } from '../../../../core/client.service';
import { UserAccessDto, UserLogDto } from '../../../../shared/service-clients/security';
import { FilterService } from '../../../../core/filter.service';
import { ClassificationValues } from '../../../../common/classification-value';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'samplicity-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  userAccess: UserAccessDto;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private securityService: SecurityService,
    private filterService: FilterService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.securityService.userAccessSubject.subscribe((userAccess: any) => {
        if (userAccess) {
          this.userAccess = userAccess;
        }
      });
    }
  }

  signout() {
    if (this.authService.isLoggedIn()) {
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      this.http.get(proxyurl + 'http://api.ipify.org/?format=json').subscribe(data => {
        const userLogDto: UserLogDto = new UserLogDto({
          userId: this.userAccess.userId,
          userAgent: navigator.userAgent,
          logTime: new Date(),
          logTypeId: ClassificationValues.LogType.LOG_OUT,
          terminalId: data['ip']
        });
        this.securityService.logUserSession(userLogDto).subscribe().add(() => {
          this.securityService.clearUserAccess();
          this.clientService.clearClientId();
          this.filterService.clearAllFilter();
          this.authService.signout();
        });
      });
    }
  }

  refreshUserAccess() {
    if (this.authService.isLoggedIn()) {
      this.securityService.refreshUserAccess().then(() => {
      }).catch((e) => {
      });
    }
  }
}
