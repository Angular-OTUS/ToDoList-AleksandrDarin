import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ItemStatus, TodoListItem} from "../../interfaces/todolist-item";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TodolistItemComponent} from "../todolist-item/todolist-item.component";
import {ButtonComponent} from "../button/button.component";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {TodoListService} from "../../services/todoListService";
import {ToastService} from "../../services/toastService";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {MatOption, MatSelect} from "@angular/material/select";
import {TodoCreateItemComponent} from "../todo-create-item/todo-create-item.component";
import {Router, RouterOutlet} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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
    LoadingSpinnerComponent,
    MatSelect,
    MatOption,
    TodoCreateItemComponent,
    RouterOutlet
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit, OnDestroy {

  protected readonly componentTitle: string = "Todo List"

  protected isLoading: boolean = true;
  protected selectedItemId: string = '';
  protected filteredItems: TodoListItem[] = [];
  protected selectedStatus: ItemStatus | null = null;
  protected statuses: string[] = Object.values(ItemStatus);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    setTimeout((): void => {
      this.isLoading = false;
    }, 500);
    this.filterItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getAllListItems(): TodoListItem[] {
    return [...this.filteredItems];
  }

  protected addItem(created: boolean): void {
    if (created) {
      this.filterItems();
      this.toastService.showToast("Item added");
    }
  }

  protected deleteItem(itemId: string): void {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.filteredItems = this.todoListService.deleteLocalItemArray(this.filteredItems, itemId);
      this.toastService.showToast("Item deleted");
    });
  }

  protected selectItem(itemId: string): void {
    this.router.navigate([`/tasks/${itemId}`]).then();
    this.selectedItemId = itemId;
  }

  protected updateItem(updatedItem: TodoListItem): void {
    this.todoListService.updateItem(updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TodoListItem) => {
      this.filteredItems = this.todoListService.updateLocalItemArray(this.filteredItems, response);
      this.toastService.showToast("Item updated");
    });
  }

  protected filterItems(): void {
    if (this.selectedStatus === null) {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems: TodoListItem[]) => {
          this.filteredItems = listItems;
      });
    } else {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems: TodoListItem[]) => {
          this.filteredItems = listItems.filter(item => item.status === this.selectedStatus);
      });
    }
  }
}
