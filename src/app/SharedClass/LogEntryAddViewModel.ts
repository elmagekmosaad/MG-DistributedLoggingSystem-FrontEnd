import { LogEntryStorageType } from "./LogEntryStorageType";
import { LogEntryLevelType } from "./LogEntryLevelType"

export interface LogEntryAddViewModel {
    storageType: LogEntryStorageType;
    service: string;
    level: LogEntryLevelType;
    message: string;
    timestamp: Date;
  }
  