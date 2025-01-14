import { Component, inject } from '@angular/core';
import { Logservice as LogService } from '../Services/log.service';
import { ResponsAPI } from '../SharedClass/respons-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../Services/user.service';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { Router } from '@angular/router';
import { LogEntryResponseViewModel } from '../SharedClass/LogEntryResponseViewModel';
import { LogEntryFilterViewModel } from '../SharedClass/LogEntryFilterViewModel';
import { PaginatedList } from '../SharedClass/PaginatedList';
import { LogEntryStorageType } from '../SharedClass/LogEntryStorageType';
import { LogEntryLevelType } from '../SharedClass/LogEntryLevelType';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [FormsModule, CommonModule, UnauthorizedComponent],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css',
})
export class LogComponent {
  userService = inject(UserService);
  logs: PaginatedList<LogEntryResponseViewModel> | null = null;
  totalRecords: number = 0;
  pageNumber: number = 1;
  pageSize: number = 5;
  isLoading: boolean = false;
  
  storageTypes() {
    return Object.values(LogEntryStorageType).filter(value => !isNaN(Number(value)));
  }
  logLevels() {
    return Object.values(LogEntryLevelType).filter(value => !isNaN(Number(value)));
  }

  getStorageTypeName(type: LogEntryStorageType): string {
    return LogEntryStorageType[type];
  }

  // getLogLevelName(type: LogEntryLevelType): string {
  //   return LogEntryLevelType[type];
  // }
  
  getStorageTypeByIndex(index: any) {
    const storage = Object.entries(LogEntryStorageType)
      .find(([key, value]) => Number(key) === index);
    return storage ? storage[1] : null;
  }
  
  getLogLevelByIndex(index: any) {
    const storage = Object.entries(LogEntryLevelType)
      .find(([key, value]) => Number(key) === index);
    return storage ? storage[1] : null;
  }
  logLevelTypes = LogEntryLevelType; 

  getLogLevelName(level: LogEntryLevelType): string {
    switch (level) {
      case LogEntryLevelType.Info:
        return 'Info';
      case LogEntryLevelType.Warning:
        return 'Warning';
      case LogEntryLevelType.Error:
        return 'Error';
      default:
        return 'Unknown';
    }
    }


  filterModel: LogEntryFilterViewModel = {
    storageType: undefined,
    service: undefined,
    level: undefined,
    startTime: undefined,
    endTime: undefined,
  };

  constructor(private _logService: LogService, private router: Router) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.isLoading = true;
    const filter: LogEntryFilterViewModel = {
      ...this.filterModel,
      startTime: this.filterModel.startTime
        ? new Date(this.filterModel.startTime)
        : undefined,
      endTime: this.filterModel.endTime
        ? new Date(this.filterModel.endTime)
        : undefined,
    };

    this._logService
      .getLogs({...filter,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }).subscribe(
        (response: ResponsAPI<PaginatedList<LogEntryResponseViewModel>>) => {
          if (response.succeeded) {
            this.logs = response.data;
        this.totalRecords = response.data.totalCount;
        this.pageNumber = response.data.pageIndex;
        this.pageSize = response.data.pageSize;
      }
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    }
  );
}

changePage(newPage: number): void {
this.pageNumber = newPage;
this.loadLogs();
}

applyFilters(): void {
this.pageNumber = 1;
this.logs = {
  items: [],
  totalCount: 0,
  pageIndex: 0,
  pageSize: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false
};
this.loadLogs();
}

viewLogDetails(id: number | null): void {
if (id != null) {
  this.router.navigate(['/log', id]);
}
}
}
