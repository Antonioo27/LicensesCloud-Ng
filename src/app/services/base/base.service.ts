import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@lgccommon/lib/services/app-config.service';
import { Location, LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CacheTableName, GetAs } from '@lgccommon/lib/models/GetAs';
import { CredentialsService } from '../credentials/credentials.service';
import { DebugService } from '../debug/debug.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public http = inject(HttpClient);
  public appConfigService = inject(AppConfigService);
  public credentialsService = inject(CredentialsService);

  public location = inject(Location);
  public locationStrategy = inject(LocationStrategy);

  public debugService = inject(DebugService);

  public activatedRoute = inject(ActivatedRoute);
  public sysPages: any = new GetAs(CacheTableName.SYS_Pages);

  constructor() {}

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Debug_Mode': this.debugService.debugMode.toString(),
    }),
    params: {},
  };

  public get BaseUrl_V(): string {
    var url = this.appConfigService.Get('BASE_URL');
    // var DYNAMIC_BASE_URL = this.appConfigService.Get('DYNAMIC_BASE_URL');

    // var API_VERSION = this.appConfigService.Get('API_VERSION');
    // if (!API_VERSION) API_VERSION = '1'; // Default value

    // if (DYNAMIC_BASE_URL === '1') {
    //   url = window.location.origin + '/api';
    // }
    // if (API_VERSION && Number(API_VERSION) > 0) {
    //   url += `/v${API_VERSION}`;
    // }
    return url;
  }

  public get HttpOptions() {
    if (this.credentialsService.credentials && this.credentialsService.credentials.Token != '') {
      if (this._httpOptions.headers.has('Authorization')) this._httpOptions.headers = this._httpOptions.headers.delete('Authorization');
        this._httpOptions.headers = this._httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.credentialsService.credentials.Token.toString()}`
      );
    }
    return this._httpOptions;
  }

}
