import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissions } from '../../generated/permission-set';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  canAccessAdmin = false;
  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    this.canAccessAdmin = false;
    if (route.data && route.data['preload']) {
      if (this.canAccessAdmin) {
        return load();
      }
    }
    return Observable.of(null);
  }
} 
