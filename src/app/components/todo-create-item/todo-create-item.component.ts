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

  protected readonly inputPlaceholder: string = "Add your new todo"
  protected readonly descriptionPlaceholder: string = "Add your new todo description"
  protected readonly addButtonTitle: string = "Add task"
  protected newItemTitle: string = '';
  protected newItemDescription: string = '';

  @Output() addItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private todoListService: TodoListService
  ) {}

  protected createItem(title: string, description?: string): void {
    this.addItem.emit(this.todoListService.addItem(title, description));
  }
}
