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

  public updateItem(updatedItem: TodoListItem): void {
    this.httpClient.put(`${this.apiUrl}/${updatedItem.id}`, updatedItem)
      .subscribe({
        error: (err) => {
          this.toastService.showToast(`Error updating item`);
          console.error(err);
        }
    })
  }

  public deleteItem(itemId: string): void {
    this.httpClient.delete(`${this.apiUrl}/${itemId}`)
      .subscribe({
        error: (err) => {
          this.toastService.showToast(`Error deleting item`);
          console.error(err);
        }
    })
  }
}
