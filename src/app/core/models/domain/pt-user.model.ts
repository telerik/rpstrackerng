import { PtObjectBase } from './';

export type PtUser = PtObjectBase & {
    fullName: string;
    avatar: string;
  };