import { IFirestoreTagDocument } from '../../services';

export interface SelectListPayload {
  selectedList: IFirestoreTagDocument | null;
}

export interface SelectedList extends IFirestoreTagDocument {
  status: {
    sync: 'SYNCED' | 'UNSYNCED'
    exporting: boolean;
    error: boolean;
  }
}

export interface PlaylistState {
  tagLists: IFirestoreTagDocument[]
  selectedList: SelectedList | null;
}

export interface SetTagListsPayload {
  lists: IFirestoreTagDocument[];
}
