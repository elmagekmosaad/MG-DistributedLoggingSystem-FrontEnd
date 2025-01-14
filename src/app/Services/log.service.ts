import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LogParameters } from '../SharedClass/logParameters-view-model';
import { ResponsAPI } from '../SharedClass/respons-api';
import { environment } from '../../../enviroment';
import { map, Observable } from 'rxjs';
import { LogEntryFilterViewModel } from '../SharedClass/LogEntryFilterViewModel';
import { UserService } from './user.service';
import { LogEntryResponseViewModel } from '../SharedClass/LogEntryResponseViewModel';
import { PaginatedList } from '../SharedClass/PaginatedList';
import { LogEntryAddViewModel } from '../SharedClass/LogEntryAddViewModel';

@Injectable({
  providedIn: 'root',
})
export class Logservice {
  private userservice = inject(UserService);
  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userservice.currenUser()}`,
      'Content-Type': 'application/json',
    }),
  };

  getLogs(filter: LogEntryFilterViewModel): Observable<ResponsAPI<PaginatedList<LogEntryResponseViewModel>>> {
    let params = new HttpParams();
    if (filter.storageType) {
      params = params.set('storageType', filter.storageType);
    }
    if (filter.service) {
      params = params.set('service', filter.service);
    }
    if (filter.level) {
      params = params.set('level', filter.level);
    }
    if (filter.startTime) {
      params = params.set('startTime', new Date(filter.startTime).toISOString());
    }
    if (filter.endTime) {
      params = params.set('endTime', new Date(filter.endTime).toISOString());
    }
    if (filter.pageNumber) {
      params = params.set('pageNumber', filter.pageNumber.toString());
    }
    if (filter.pageSize) {
      params = params.set('pageSize', filter.pageSize.toString());
    }
    return this._http.get<ResponsAPI<PaginatedList<LogEntryResponseViewModel>>>(
      `${environment.apiUrl}v1/logs/GetLogs`,
      {
        params: params,
        headers: this.httpOptions.headers,
      }
    );
  }
  GetById(id: number): Observable<ResponsAPI<LogEntryResponseViewModel>> {
    let params = new HttpParams();
    if (id != null) {
      params = params.set('id', id);
    }
    return this._http.get<ResponsAPI<LogEntryResponseViewModel>>(
      `${environment.apiUrl}v1/logs/GetById`,
      {
        params: params,
        headers: this.httpOptions.headers,
      }
    );
  }
  AddLog(LogEntryAddViewModel: LogEntryAddViewModel): Observable<ResponsAPI<LogEntryResponseViewModel>> {
    return this._http.post<ResponsAPI<LogEntryResponseViewModel>>(
      `${environment.apiUrl}v1/logs/AddLogEntry`,
      LogEntryAddViewModel,
      { headers: this.httpOptions.headers }
    );
  }
}
