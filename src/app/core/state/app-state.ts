import { PtItem, PtUser } from '../models/domain';
import { PresetType } from '../models/domain/types';

export type StateKey = 'backlogItems' | 'users' | 'currentUser' | 'currentSelectedItem' | 'selectedPreset';

export type State ={
    backlogItems: PtItem[];
    users: PtUser[];
    currentUser: PtUser | undefined;
    currentSelectedItem: PtItem | undefined;
    selectedPreset: PresetType;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    backlogItems: [],
    users: [],
    currentUser: undefined,
    currentSelectedItem: undefined,
    selectedPreset: 'open'
};
