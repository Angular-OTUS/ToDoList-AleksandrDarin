import {Injectable} from "@angular/core";
import {ItemStatus, TodoListItem} from "../interfaces/todolist-item";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";
import {Observable} from "rxjs";
import {ToastService} from "./toastService";

@Injectable({
  providedIn: "root"
})
export class TodoListService {

  private readonly apiUrl: string = environment.apiUrl

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  public addItem(title: string, description?: string): boolean {
    if (title.trim()) {
      const newItem: TodoListItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description?.trim(),
        status: ItemStatus.IN_PROGRESS
      };
      this.httpClient.post(this.apiUrl, newItem)
        .subscribe({
          error: (err) => {
            this.toastService.showToast("Error adding new item");
            console.error(err);
          }
      })
      return true;
    }
    return false;
  }

  public getAllListItems(): Observable<TodoListItem[]> {
    return this.httpClient.get<TodoListItem[]>(this.apiUrl);
  }

  public updateItem(updatedItem: TodoListItem): Observable<TodoListItem> {
    return this.httpClient.put<TodoListItem>(`${this.apiUrl}/${updatedItem.id}`, updatedItem)
  }

  public updateLocalItemArray(items: TodoListItem[], updatedItem: TodoListItem): TodoListItem[] {
    const index: number = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
    }
    return [...items];
  }

  public deleteItem(itemId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${itemId}`)
  }

  public deleteLocalItemArray(items: TodoListItem[], itemId: string): TodoListItem[] {
    return items.filter(item => item.id !== itemId);
  }
}
