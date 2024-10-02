import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodolistComponent} from "./components/todolist/todolist.component";
import {ToastComponent} from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todolist';
}
