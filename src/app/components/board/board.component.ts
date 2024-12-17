import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {TodoCreateItemComponent} from "../todo-create-item/todo-create-item.component";
import {TodolistItemComponent} from "../todolist-item/todolist-item.component";
import {ItemStatus, TodoListItem} from "../../interfaces/todolist-item";
import {TodoListService} from "../../services/todoListService";
import {ToastService} from "../../services/toastService";
import {Subject, takeUntil} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    MatFormField,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    RouterOutlet,
    TodoCreateItemComponent,
    TodolistItemComponent,
    NgClass
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit, OnDestroy {

  protected isLoading: boolean = true;
  protected filteredItems: TodoListItem[] = [];
  protected selectedStatus: ItemStatus | null = null;
  protected statuses: string[] = Object.values(ItemStatus);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private translateService: TranslateService
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

  protected deleteItem(itemId: string): void {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.filteredItems = this.todoListService.deleteLocalItemArray(this.filteredItems, itemId);
      this.toastService.showToast(this.translateService.instant('toast.task.deleted'));
    });
  }

  protected updateItem(updatedItem: TodoListItem): void {
    this.todoListService.updateItem(updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TodoListItem) => {
      this.filteredItems = this.todoListService.updateLocalItemArray(this.filteredItems, response);
        this.toastService.showToast(this.translateService.instant('toast.task.updated'));
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
          this.filteredItems = listItems.filter((item: TodoListItem) => item.status === this.selectedStatus);
        });
    }
  }

  protected getAllListItemsByStatus(status: string): TodoListItem[] {
    return this.getAllListItems().filter((item: TodoListItem) => item.status === status);
  }
}
