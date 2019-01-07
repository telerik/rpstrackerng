export enum PriorityEnum {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}
export namespace PriorityEnum {
    export function isMax(priority: PriorityEnum): boolean {
        return priority === PriorityEnum.Critical;
    }
    export function isMin(priority: PriorityEnum): boolean {
        return priority === PriorityEnum.Low;
    }
    export function nextPriority(priority: PriorityEnum): PriorityEnum | undefined {
        switch (priority) {
            case PriorityEnum.Critical:
                return undefined;
            case PriorityEnum.High:
                return PriorityEnum.Critical;
            case PriorityEnum.Medium:
                return PriorityEnum.High;
            case PriorityEnum.Low:
                return PriorityEnum.Medium;
        }
    }
    export function previousPriority(priority: PriorityEnum): PriorityEnum | undefined {
        switch (priority) {
            case PriorityEnum.Critical:
                return PriorityEnum.High;
            case PriorityEnum.High:
                return PriorityEnum.Medium;
            case PriorityEnum.Medium:
                return PriorityEnum.Low;
            case PriorityEnum.Low:
                return undefined;
        }
    }
    export function getIndicatorClass(priority: PriorityEnum): string {
        switch (priority) {
            case PriorityEnum.Critical:
                return 'priority-critical';
            case PriorityEnum.High:
                return 'priority-high';
            case PriorityEnum.Medium:
                return 'priority-medium';
            case PriorityEnum.Low:
                return 'priority-low';
            default:
                return '';
        }
    }
    export function getColor(priority: PriorityEnum): string {
        switch (priority) {
            case PriorityEnum.Critical:
                return '#820101';
            case PriorityEnum.High:
                return '#b27100';
            case PriorityEnum.Medium:
                return '#0c6d00';
            case PriorityEnum.Low:
                return '#002b6d';
        }
    }
}
