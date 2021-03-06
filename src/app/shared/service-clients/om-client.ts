﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.3.0.0 (NJsonSchema v10.1.11.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const OM_CLIENT_API_BASE_URL = new InjectionToken<string>('OM_CLIENT_API_BASE_URL');

export class ServiceBaseConfig {
  public key: string;
}

export class ServiceBase {
  private readonly apiKey: string;
  private readonly apimHeaderName: string = 'Ocp-Apim-Subscription-Key';
  private readonly tenantIdHeaderName: string = 'TenantId';
  private readonly tenantIdLocalStorageKey: string = 'samplicity-dtp-current-client';
  private readonly idTokenKey: string = 'samplicity-id-token';

  constructor(config: ServiceBaseConfig) {
    this.apiKey = config.key;
  }

  protected transformOptions(options: any) {
    let headers: HttpHeaders = options.headers;

    if (this.apiKey) {
      headers = headers.append(this.apimHeaderName, this.apiKey);
    }

    const tenantId = sessionStorage.getItem(this.tenantIdLocalStorageKey);
    if (tenantId) {
      headers = headers.append(this.tenantIdHeaderName, tenantId);
    }

    const token = localStorage.getItem(this.idTokenKey);
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    options.headers = headers;

    return Promise.resolve(options);
  }
}

@Injectable()
export class OrderManagementClient extends ServiceBase {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(ServiceBaseConfig) configuration: ServiceBaseConfig, @Inject(HttpClient) http: HttpClient, @Optional() @Inject(OM_CLIENT_API_BASE_URL) baseUrl?: string) {
        super(configuration);
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getFilesByTenantId(): Observable<AjaxResponseOfIEnumerableOfTenantFileDto> {
        let url_ = this.baseUrl + "/api/services/app/TenantFile/GetFilesByTenantId";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return Observable.fromPromise(this.transformOptions(options_)).flatMap(transformedOptions_ => {
            return this.http.request("get", url_, transformedOptions_);
        }).flatMap((response_: any) => {
            return this.processGetFilesByTenantId(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFilesByTenantId(<any>response_);
                } catch (e) {
                    return <Observable<AjaxResponseOfIEnumerableOfTenantFileDto>><any>Observable.throw(e);
                }
            } else
                return <Observable<AjaxResponseOfIEnumerableOfTenantFileDto>><any>Observable.throw(response_);
        });
    }

    protected processGetFilesByTenantId(response: HttpResponseBase): Observable<AjaxResponseOfIEnumerableOfTenantFileDto> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AjaxResponseOfIEnumerableOfTenantFileDto.fromJS(resultData200);
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<AjaxResponseOfIEnumerableOfTenantFileDto>(<any>null);
    }
}

export class AjaxResponseOfIEnumerableOfTenantFileDto implements IAjaxResponseOfIEnumerableOfTenantFileDto {
    result: TenantFileDto[] | undefined;
    targetUrl: string | undefined;
    success: boolean | undefined;
    error: ErrorInfo | undefined;
    unAuthorizedRequest: boolean | undefined;
    readonly __abp: boolean | undefined;

    constructor(data?: IAjaxResponseOfIEnumerableOfTenantFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["result"])) {
                this.result = [] as any;
                for (let item of _data["result"])
                    this.result.push(TenantFileDto.fromJS(item));
            }
            this.targetUrl = _data["targetUrl"];
            this.success = _data["success"];
            this.error = _data["error"] ? ErrorInfo.fromJS(_data["error"]) : <any>undefined;
            this.unAuthorizedRequest = _data["unAuthorizedRequest"];
            (<any>this).__abp = _data["__abp"];
        }
    }

    static fromJS(data: any): AjaxResponseOfIEnumerableOfTenantFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new AjaxResponseOfIEnumerableOfTenantFileDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.result)) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        data["targetUrl"] = this.targetUrl;
        data["success"] = this.success;
        data["error"] = this.error ? this.error.toJSON() : <any>undefined;
        data["unAuthorizedRequest"] = this.unAuthorizedRequest;
        data["__abp"] = this.__abp;
        return data; 
    }

    clone(): AjaxResponseOfIEnumerableOfTenantFileDto {
        const json = this.toJSON();
        let result = new AjaxResponseOfIEnumerableOfTenantFileDto();
        result.init(json);
        return result;
    }
}

export interface IAjaxResponseOfIEnumerableOfTenantFileDto {
    result: TenantFileDto[] | undefined;
    targetUrl: string | undefined;
    success: boolean | undefined;
    error: ErrorInfo | undefined;
    unAuthorizedRequest: boolean | undefined;
    __abp: boolean | undefined;
}

export class TenantFileDto implements ITenantFileDto {
    fileTypeId: string | undefined;
    hasErrors: boolean | undefined;
    hasMissingFile: boolean | undefined;
    fileName: string | undefined;
    fileLocation: string | undefined;
    lastUpdatedDateTime: Date | undefined;

    constructor(data?: ITenantFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fileTypeId = _data["fileTypeId"];
            this.hasErrors = _data["hasErrors"];
            this.hasMissingFile = _data["hasMissingFile"];
            this.fileName = _data["fileName"];
            this.fileLocation = _data["fileLocation"];
            this.lastUpdatedDateTime = _data["lastUpdatedDateTime"] ? new Date(_data["lastUpdatedDateTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): TenantFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new TenantFileDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileTypeId"] = this.fileTypeId;
        data["hasErrors"] = this.hasErrors;
        data["hasMissingFile"] = this.hasMissingFile;
        data["fileName"] = this.fileName;
        data["fileLocation"] = this.fileLocation;
        data["lastUpdatedDateTime"] = this.lastUpdatedDateTime ? this.lastUpdatedDateTime.toISOString() : <any>undefined;
        return data; 
    }

    clone(): TenantFileDto {
        const json = this.toJSON();
        let result = new TenantFileDto();
        result.init(json);
        return result;
    }
}

export interface ITenantFileDto {
    fileTypeId: string | undefined;
    hasErrors: boolean | undefined;
    hasMissingFile: boolean | undefined;
    fileName: string | undefined;
    fileLocation: string | undefined;
    lastUpdatedDateTime: Date | undefined;
}

export class ErrorInfo implements IErrorInfo {
    code: number | undefined;
    message: string | undefined;
    details: string | undefined;
    validationErrors: ValidationErrorInfo[] | undefined;

    constructor(data?: IErrorInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.code = _data["code"];
            this.message = _data["message"];
            this.details = _data["details"];
            if (Array.isArray(_data["validationErrors"])) {
                this.validationErrors = [] as any;
                for (let item of _data["validationErrors"])
                    this.validationErrors.push(ValidationErrorInfo.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ErrorInfo {
        data = typeof data === 'object' ? data : {};
        let result = new ErrorInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["code"] = this.code;
        data["message"] = this.message;
        data["details"] = this.details;
        if (Array.isArray(this.validationErrors)) {
            data["validationErrors"] = [];
            for (let item of this.validationErrors)
                data["validationErrors"].push(item.toJSON());
        }
        return data; 
    }

    clone(): ErrorInfo {
        const json = this.toJSON();
        let result = new ErrorInfo();
        result.init(json);
        return result;
    }
}

export interface IErrorInfo {
    code: number | undefined;
    message: string | undefined;
    details: string | undefined;
    validationErrors: ValidationErrorInfo[] | undefined;
}

export class ValidationErrorInfo implements IValidationErrorInfo {
    message: string | undefined;
    members: string[] | undefined;

    constructor(data?: IValidationErrorInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            if (Array.isArray(_data["members"])) {
                this.members = [] as any;
                for (let item of _data["members"])
                    this.members.push(item);
            }
        }
    }

    static fromJS(data: any): ValidationErrorInfo {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationErrorInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        if (Array.isArray(this.members)) {
            data["members"] = [];
            for (let item of this.members)
                data["members"].push(item);
        }
        return data; 
    }

    clone(): ValidationErrorInfo {
        const json = this.toJSON();
        let result = new ValidationErrorInfo();
        result.init(json);
        return result;
    }
}

export interface IValidationErrorInfo {
    message: string | undefined;
    members: string[] | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = event => { 
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob); 
        }
    });
}