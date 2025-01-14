import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Logservice as LogService } from '../Services/log.service';
import { CommonModule } from '@angular/common';
import { ResponsAPI } from '../SharedClass/respons-api';
import {LogEntryResponseViewModel} from '../SharedClass/LogEntryResponseViewModel';
import { LogEntryLevelType } from '../SharedClass/LogEntryLevelType';
import { LogEntryStorageType } from '../SharedClass/LogEntryStorageType';

@Component({
  selector: 'app-logdetails',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './logdetails.component.html',
  styleUrl: './logdetails.component.css',
})
export class LogdetailsComponent implements OnInit {
  logId: number | null = null;
  logDetails: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  serviceName: string | null = null;
  constructor(private route: ActivatedRoute, private _logService: LogService) {}
  ngOnInit(): void {
    this.logId = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceName = this.route.snapshot.paramMap.get('serviceName');
    console.log(this.serviceName);
    if (this.logId != null) {
      this.fetchLogDetails(this.logId);
    }
  }

  getStorageTypeByIndex(index: any) {
    const storage = Object.entries(LogEntryStorageType)
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
    
  fetchLogDetails(id: number | null): void {
    this.isLoading = true;
    if (id != null) {
      this._logService.GetById(id).subscribe(
        (response: ResponsAPI<LogEntryResponseViewModel>) => {
          this.logDetails = response.data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching log details:', error);
          this.errorMessage =
            'Unable to fetch log details. Please try again later.';
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid log ID.';
    }
  }
  
}
