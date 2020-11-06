import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormComponent } from '../shared/forms/form/form.component';
import { DetailPageComponent } from '../shared/components/detail-page/detail-page.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

  private getFormProperty(component: any): FormComponent | null {
    if (!component) {
      return null;
    }

    for (const key in component) {
      if (component.hasOwnProperty(key)) {
        if (component[key] instanceof FormComponent) {
          return component[key];
        }
        if (component[key] instanceof DetailPageComponent) {
          return (component[key] as DetailPageComponent).form;
        }
      }
    }
    return null;
  }

  canDeactivate(
    component: any,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    future: RouterStateSnapshot): Observable<boolean> | boolean {

    const form = this.getFormProperty(component);
    if (form && form.formIsDirty) {
      form.tryNavigateAway(future.url);
      return false;
    }
    return true;
  }

}
