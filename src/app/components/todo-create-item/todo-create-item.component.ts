import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {TodoListService} from "../../services/todoListService";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toastService";

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
export class TodoCreateItemComponent implements OnDestroy {

  protected readonly inputPlaceholder: string = "Add your new todo"
  protected readonly descriptionPlaceholder: string = "Add your new todo description"
  protected readonly addButtonTitle: string = "Add task"
  protected newItemTitle: string = '';
  protected newItemDescription: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  @Output() addItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected createItem(title: string, description?: string): void {
    this.todoListService.addItem(title, description)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err) => {
          this.toastService.showToast("Error adding new item");
          throw Error("Error adding new item: " + err.message);
        }
      });
    this.addItem.emit(true);
  }
}
