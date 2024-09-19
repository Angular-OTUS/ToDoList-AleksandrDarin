import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TodoListItem} from "../../interfaces/todolist-item";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TodolistItemComponent} from "../todolist-item/todolist-item.component";
import {ButtonComponent} from "../button/button.component";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {TodoListService} from "../../services/todoListService";
import {ToastService} from "../../services/toastService";

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    MatFormField,
    MatInput,
    TodolistItemComponent,
    NgIf,
    ButtonComponent,
    NgClass,
    TooltipDirective,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {

  protected componentTitle = "Todo List"
  protected inputPlaceholder = "Add your new todo"
  protected descriptionPlaceholder = "Add your new todo description"
  protected addButtonTitle = "Add task"
  protected newItemTitle = '';
  protected newItemDescription = '';
  protected isLoading = true;

  protected selectedItemId: string = '';

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    setInterval((): void => {
      this.isLoading = false;
    }, 500);
  }

  protected getAllListItems(): TodoListItem[] {
    return this.todoListService.getAllListItems();
  }

  protected addItem(title: string, description: string): void {
    this.todoListService.addItem(title, description);
    this.toastService.showToast("Item added");
  }

  protected deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
    this.toastService.showToast("Item deleted");
  }

  protected selectItem(itemId: string) {
    this.selectedItemId = itemId;
  }

  protected updateItem(updatedItem: TodoListItem) {
    this.todoListService.updateItem(updatedItem);
    this.toastService.showToast("Item updated");
  }

  protected getSelectedItemDescription(): string {
    return this.todoListService.getAllListItems().find(item => item.id === this.selectedItemId)?.description ?? '';
  }
}
