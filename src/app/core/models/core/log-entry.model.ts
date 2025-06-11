import { LoggingLevelEnum } from '../enums';

export type LogEntry = {
    message: string;
    level: LoggingLevelEnum;
}
