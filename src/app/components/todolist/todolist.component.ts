import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TodoListItem} from "../../interfaces/todolist-item";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TodolistItemComponent} from "../todolist-item/todolist-item.component";
import {ButtonComponent} from "../button/button.component";

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
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {

  protected componentTitle = "Todo List"
  protected inputPlaceholder = "Add your new todo"
  protected addButtonTitle = "Add task"
  protected newItemValue = '';
  protected isLoading = true;

  protected listItems: TodoListItem[] = [
    { id: 1, description: "Buy a new gaming laptop" },
    { id: 2, description: "Complete previous task" },
    { id: 3, description: "Create some angular app" },
  ]

  ngOnInit(): void {
    setInterval((): void => {
      this.isLoading = false;
    }, 500);
  }

  protected addItem(description: string) {
    if (description.trim()) {
      const newItem = {
        id: this.listItems.length + 1,
        description: description.trim(),
      };
      this.listItems.push(newItem);
    }
  }

  protected deleteItem(itemId: number) {
    this.listItems = this.listItems.filter(item => item.id !== itemId);
  }
}
