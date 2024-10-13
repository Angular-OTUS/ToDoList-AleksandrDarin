export interface TodoListItem {
  id: string;
  title: string;
  description?: string;
  status: ItemStatus;
}

export enum ItemStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}
