import { PtObjectBase } from './';

export type PtTask = PtObjectBase & {
    completed: boolean;
    dateStart?: Date;
    dateEnd?: Date;
  };