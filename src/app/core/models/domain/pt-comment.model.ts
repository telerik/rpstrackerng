import { PtObjectBase, PtUser } from './';

export type PtComment = PtObjectBase & {
    user?: PtUser;
}
