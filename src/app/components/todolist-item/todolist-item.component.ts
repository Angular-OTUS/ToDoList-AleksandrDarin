import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoListItem} from "../../interfaces/todolist-item";

@Component({
  selector: 'app-todolist-item',
  standalone: true,
  imports: [],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.css'
})
export class TodolistItemComponent {

  @Input() listItem!: TodoListItem;
  @Output() delete = new EventEmitter<number>();
  deleteButtonTitle = "Delete"

  protected deleteItem() {
    this.delete.emit(this.listItem.id);
  }
}
