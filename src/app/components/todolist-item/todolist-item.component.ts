import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ItemStatus, TodoListItem} from "../../interfaces/todolist-item";
import {ButtonComponent} from "../button/button.component";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-todolist-item',
  standalone: true,
  imports: [
    ButtonComponent,
    TooltipDirective,
    FormsModule,
    NgIf,
    TranslatePipe,
  ],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.css',
})
export class TodolistItemComponent {

  @Input() listItem!: TodoListItem;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() update: EventEmitter<TodoListItem> = new EventEmitter<TodoListItem>();

  protected isEditing: boolean = false;
  protected editTitle: string = '';

  constructor(
    private elementRef: ElementRef
  ) {}

  protected deleteItem(): void {
    this.delete.emit(this.listItem.id);
  }

  protected enableEdit(): void {
    this.isEditing = true;
    this.editTitle = this.listItem.title;
  }

  protected toggleStatus(): void {
    this.listItem.status = this.listItem.status === ItemStatus.IN_PROGRESS ?
      ItemStatus.COMPLETED : ItemStatus.IN_PROGRESS;

    this.update.emit(this.listItem);
  }

  protected saveTitle(): void {
    if (this.editTitle.trim()) {
      this.listItem.title = this.editTitle;
      this.update.emit(this.listItem);
      this.isEditing = false;
    }
  }

  @HostListener('document:click', ['$event'])
  protected onClickOutside(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isEditing) {
      this.isEditing = false;
    }
  }

  protected readonly ItemStatus = ItemStatus;
}
