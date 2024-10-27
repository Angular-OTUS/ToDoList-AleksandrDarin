import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoListService} from "../../services/todoListService";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map, Subject, switchMap, takeUntil} from "rxjs";
import {TodoListItem} from "../../interfaces/todolist-item";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-todolist-item-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './todolist-item-view.component.html',
  styleUrl: './todolist-item-view.component.css'
})
export class TodolistItemViewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  protected listItem: TodoListItem | null = null;

  constructor(
    private todoListService: TodoListService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((paramMap: ParamMap) => {
          const itemId = paramMap.get("itemId");
          return this.todoListService.getAllListItems().pipe(
            map((listItems) => listItems.find(item => item.id === itemId))
          );
        })
      )
      .subscribe((item) => {
        if (item) {
          this.listItem = item;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getItemDescription(): string {
    if (this.listItem == null || this.listItem.description == null) {
      return '';
    } else {
      return this.listItem.description;
    }
  }
}
