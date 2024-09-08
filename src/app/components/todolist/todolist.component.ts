import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TodoListItem} from "../../interfaces/todolist-item";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TodolistItemComponent} from "../todolist-item/todolist-item.component";
import {ButtonComponent} from "../button/button.component";
import {TooltipDirective} from "../../shared/tooltip.directive";

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

  protected selectedItemId: number | null = null;

  protected listItems: TodoListItem[] = [
    { id: 1, title: "Buy a new gaming laptop", description: "It should be super cool" },
    { id: 2, title: "Complete previous task", description: "Be happy about your new laptop" },
    { id: 3, title: "Create some angular app", description: "Give it a try" },
  ]

  ngOnInit(): void {
    setInterval((): void => {
      this.isLoading = false;
    }, 500);
  }

  protected addItem(title: string, description: string): void {
    if (title.trim()) {
      const newItem = {
        id: this.listItems.length + 1,
        title: title.trim(),
        description: description.trim(),
      };
      this.listItems.push(newItem);
    }
  }

  protected deleteItem(itemId: number) {
    this.listItems = this.listItems.filter(item => item.id !== itemId);
  }

  protected selectItem(itemId: number) {
    this.selectedItemId = itemId;
  }

  protected getSelectedItemDescription(): string {
    return this.listItems.find(item => item.id === this.selectedItemId)?.description ?? '';
  }
}
