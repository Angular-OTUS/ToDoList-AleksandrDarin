import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  componentTitle = "Todo List"
  deleteButtonTitle = "Delete"
  inputPlaceholder = "Add your new todo"
  addButtonTitle = "Add task"
  newItemValue: string = '';

  listItems: Item[] = [
    { itemIndex: 1, description: "Buy a new gaming laptop" },
    { itemIndex: 2, description: "Complete previous task" },
    { itemIndex: 3, description: "Create some angular app" }
  ]

  addItem(description: string) {
    if (description.trim()) {
      const newItem = {
        itemIndex: this.listItems.length + 1,
        description: description.trim()
      };
      this.listItems.push(newItem);
    }
  }

  deleteItem(itemIndex: number) {
    this.listItems = this.listItems.filter(item => item.itemIndex !== itemIndex);
  }
}

export interface Item {
  itemIndex: number;
  description: string;
}
