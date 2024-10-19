import { PtTask, PtItem } from '../models/domain';

export function datesForTask(t: PtTask) {
    t.dateCreated = new Date(t.dateCreated);
    t.dateDeleted = t.dateDeleted ? new Date(t.dateDeleted) : undefined;
    t.dateEnd = t.dateEnd ? new Date(t.dateEnd) : undefined;
    t.dateModified = new Date(t.dateModified);
    t.dateStart = t.dateStart ? new Date(t.dateStart) : undefined;
}

export function datesForPtItem(i: PtItem) {
    i.dateCreated = new Date(i.dateCreated);
    i.dateDeleted = i.dateDeleted ? new Date(i.dateDeleted) : undefined;
    i.dateModified = new Date(i.dateModified);
}
