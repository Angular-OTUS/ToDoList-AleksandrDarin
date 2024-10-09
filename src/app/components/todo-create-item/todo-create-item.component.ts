import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {TodoListService} from "../../services/todoListService";

@Component({
  selector: 'app-todo-create-item',
  standalone: true,
  imports: [
    ButtonComponent,
    MatInput,
    ReactiveFormsModule,
    TooltipDirective,
    FormsModule
  ],
  templateUrl: './todo-create-item.component.html',
  styleUrl: './todo-create-item.component.css'
})
export class TodoCreateItemComponent {

  protected inputPlaceholder = "Add your new todo"
  protected descriptionPlaceholder = "Add your new todo description"
  protected addButtonTitle = "Add task"
  protected newItemTitle = '';
  protected newItemDescription = '';

  @Output() addItem = new EventEmitter<boolean>();

  constructor(
    private todoListService: TodoListService
  ) {}

  protected createItem(title: string, description?: string) {
    this.addItem.emit(this.todoListService.addItem(title, description))
  }
}
