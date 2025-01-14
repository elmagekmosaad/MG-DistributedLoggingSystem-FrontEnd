import { LogEntryStorageType } from "./LogEntryStorageType";
import { LogEntryLevelType } from "./LogEntryLevelType"

export interface LogEntryFilterViewModel {
  storageType?: LogEntryStorageType;
  service?: string;
  level?: LogEntryLevelType;
  startTime?: Date;
  endTime?: Date;
  pageNumber?: number;
  pageSize?: number;
}