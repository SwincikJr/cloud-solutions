import { StorageInterface } from '../../common/interfaces/storage.interface';

export interface CopyFileOptionsInterface {
    toStorage?: StorageInterface;
    checkSize?: boolean;
    move?: boolean;
    clear?: boolean;
}

export const copyFileOptionsDefault = {
    checkSize: false,
    move: false,
};
