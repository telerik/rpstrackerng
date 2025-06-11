import { Injectable } from '@angular/core';
import { LogEntry } from '../models/core';
import { LoggingLevelEnum } from '../models/enums';
import { environment as env } from '../../../environments/environment';

@Injectable({
    providedIn: 'root', // Makes it available globally
})
export class LoggerService {
    private logs: LogEntry[] = [];

    public log(message: string) {
        if (env.loggingEnabled && env.loggingLevel === LoggingLevelEnum.Debug) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Log });
            console.log(message);
        }
    }

    public warn(message: string) {
        if (env.loggingEnabled && env.loggingLevel === LoggingLevelEnum.Debug) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Warn });
            console.warn(message);
        }
    }

    public error(message: string) {
        if (env.loggingEnabled) {
            this.logs.push({ message: message, level: LoggingLevelEnum.Error });
            console.error(message);
        }
    }
}
