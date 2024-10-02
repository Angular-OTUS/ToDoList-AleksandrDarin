import {Injectable} from "@angular/core";
import {TodoListItem} from "../interfaces/todolist-item";

@Injectable({
  providedIn: "root"
})
export class TodoListService {

  private listItems: TodoListItem[] = [
    { id: crypto.randomUUID(), title: "Buy a new gaming laptop", description: "It should be super cool" },
    { id: crypto.randomUUID(), title: "Complete previous task", description: "Be happy about your new laptop" },
    { id: crypto.randomUUID(), title: "Create some angular app", description: "Give it a try" },
  ];

  public addItem(title: string, description: string) {
    if (title.trim()) {
      const newItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
      };
      this.listItems.push(newItem);
    }
  }

  public getAllListItems(): TodoListItem[] {
    return [...this.listItems];
  }

  public updateItem(updatedItem: TodoListItem) {
    const index = this.listItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.listItems[index] = updatedItem;
    } else {
      throw Error(`List item with id ${updatedItem.id}`)
    }
  }

  public deleteItem(itemId: string) {
    this.listItems = this.listItems.filter(item => item.id !== itemId);
  }
}
