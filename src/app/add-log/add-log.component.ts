import { Component, inject } from '@angular/core';
import { LogEntryAddViewModel } from '../SharedClass/LogEntryAddViewModel';
import { ResponsAPI } from '../SharedClass/respons-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Logservice as LogService } from '../Services/log.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Services/user.service';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { Router } from '@angular/router';
import { LogEntryStorageType } from '../SharedClass/LogEntryStorageType';
import { LogEntryLevelType } from '../SharedClass/LogEntryLevelType';
import { LogEntryResponseViewModel } from '../SharedClass/LogEntryResponseViewModel';

@Component({
  selector: 'app-add-log',
  standalone: true,
  imports: [FormsModule, CommonModule, UnauthorizedComponent],
  templateUrl: './add-log.component.html',
  styleUrl: './add-log.component.css',
})
export class AddLogComponent {
  userService = inject(UserService);
  enumKeys=Object.keys(LogEntryLevelType).filter(Number);
  conditionalOperator = LogEntryLevelType;

  Model: LogEntryAddViewModel = {
    storageType: LogEntryStorageType.Database,
    service: 'test1',
    level: LogEntryLevelType.Info,
    message: 'test2',
    timestamp: new Date(),
  };

  constructor(
    private _logService: LogService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  storageTypes() {
    return Object.values(LogEntryStorageType).filter(value => !isNaN(Number(value)));
  }
  logLevels() {
    return Object.values(LogEntryLevelType).filter(value => !isNaN(Number(value)));
  }
  getStorageTypeName(type: LogEntryStorageType): string {
    return LogEntryStorageType[type];
  }
  
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


  
  getLogLevelName(type: LogEntryLevelType): string {
    return LogEntryLevelType[type];
  }


  

  addLog() {
    if (!this.Model.service || !this.Model.message) {
      this.toastr.error('Please fill all required fields.');
      return;
    }
    this.Model.storageType = Number(this.Model.storageType);
    this.Model.level = Number(this.Model.level);
    this.Model.timestamp = new Date(this.Model.timestamp);

    this._logService.AddLog(this.Model).subscribe({
      next: (response: ResponsAPI<LogEntryResponseViewModel>) => {
        if (response.succeeded) {
          this.toastr.success(response.message);
          this.router.navigate(['Log']);
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.toastr.error('Failed to add log.');
      },
    });
  }
  
}
