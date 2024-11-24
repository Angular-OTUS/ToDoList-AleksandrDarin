import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
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
import {BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil} from "rxjs";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

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
    RouterOutlet,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit, OnDestroy {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoading$: Observable<boolean> = this.isLoading.asObservable();

  private filteredItems: BehaviorSubject<TodoListItem[]> = new BehaviorSubject<TodoListItem[]>([]);
  public filteredItems$: Observable<TodoListItem[]> = this.filteredItems.asObservable();

  private selectedStatus: BehaviorSubject<ItemStatus | null> = new BehaviorSubject<ItemStatus | null>(null);
  public selectedStatus$: Observable<ItemStatus | null> = this.selectedStatus.asObservable();

  protected statuses: string[] = Object.values(ItemStatus);
  protected selectedItemId: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.initializeFilter();
    setTimeout(() => this.isLoading.next(false), 500);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected addItem(created: boolean): void {
    if (created) {
      this.initializeFilter();
      this.toastService.showToast(this.translateService.instant('toast.task.created'));
    }
  }

  protected deleteItem(itemId: string): void {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const updatedItems: TodoListItem[] = this.todoListService.deleteLocalItemArray(this.filteredItems.getValue(), itemId);
        this.filteredItems.next(updatedItems);
        this.toastService.showToast(this.translateService.instant('toast.task.deleted'));
      });
  }

  protected selectItem(itemId: string): void {
    this.router.navigate([`backlog/tasks/${itemId}`]).then();
    this.selectedItemId = itemId;
  }

  protected updateItem(updatedItem: TodoListItem): void {
    this.todoListService.updateItem(updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TodoListItem) => {
        const updatedItems: TodoListItem[] = this.filteredItems.getValue().map(item =>
          item.id === response.id ? response : item
        );

        const selectedStatus: ItemStatus | null = this.selectedStatus.getValue();
        const filteredItems: TodoListItem[] =
          selectedStatus ? updatedItems.filter((item: TodoListItem) => item.status === selectedStatus) : updatedItems;

        this.filteredItems.next(filteredItems);
        this.toastService.showToast(this.translateService.instant('toast.task.updated'));
      });
  }

  protected setSelectedStatus(status: ItemStatus | null): void {
    this.selectedStatus.next(status);
  }

  private initializeFilter(): void {
    combineLatest([this.todoListService.getAllListItems(), this.selectedStatus$])
      .pipe(
        takeUntil(this.destroy$),
        map(([listItems, selectedStatus]) =>
          selectedStatus === null ? listItems : listItems.filter(item => item.status === selectedStatus)
        )
      )
      .subscribe(filteredItems => this.filteredItems.next(filteredItems));
  }
}
