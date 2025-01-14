import { LogEntryAddViewModel } from "./LogEntryAddViewModel";
import { PaginatedList } from "./PaginatedList";

export interface LogEntryResponseViewModel extends LogEntryAddViewModel {
    id:number;
    createdDate: Date;

}
