
import {refCount, publishLast} from 'rxjs/operators';
import { Observable } from 'rxjs';

export class BusySpinner {
    busyPromises: { [id: string]: Promise<any>; } = {};

    setBusySpinner<T>(observable: Observable<T>, prop: string = '', manual: boolean = false): Observable<T> {
        let sharable = null;
        if (observable) {
            sharable = observable.pipe(publishLast(),refCount(),);
        }
        const promise = !manual ? sharable.toPromise() : new Promise<boolean>((resolve, reject) => {
            resolve = resolve;
            reject = reject;
        });

        if (prop) {
            this.busyPromises[prop] = promise;
        } else {
            this.busyPromises['default'] = promise;
        }

        return sharable;
    }

    get busyPromise(): Promise<any> {
        return this.busyPromises['default'];
    }
}
