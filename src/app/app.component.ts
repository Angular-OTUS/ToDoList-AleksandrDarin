import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodolistComponent} from "./components/todolist/todolist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todolist';
}
