import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {TodoListItem} from "../../interfaces/todolist-item";
import {ButtonComponent} from "../button/button.component";
import {TooltipDirective} from "../../shared/tooltip.directive";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-todolist-item',
  standalone: true,
  imports: [
    ButtonComponent,
    TooltipDirective,
    FormsModule,
    NgIf,
  ],
  templateUrl: './todolist-item.component.html',
  styleUrl: './todolist-item.component.css',
})
export class TodolistItemComponent {

  @Input() listItem!: TodoListItem;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<TodoListItem>();

  deleteButtonTitle = "Delete";
  saveButtonTitle = "Save";
  isEditing = false;
  editTitle = '';

  constructor(
    private elementRef: ElementRef
  ) {}

  protected deleteItem() {
    this.delete.emit(this.listItem.id);
  }

  protected enableEdit() {
    this.isEditing = true;
    this.editTitle = this.listItem.title;
  }

  protected saveTitle() {
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
}
