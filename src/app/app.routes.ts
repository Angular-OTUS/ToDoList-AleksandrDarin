import { Routes } from '@angular/router';
import {TodolistComponent} from "./components/todolist/todolist.component";
import {TodolistItemViewComponent} from "./components/todolist-item-view/todolist-item-view.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full"
  },
  {
    path: "tasks",
    component: TodolistComponent,
    children: [
      {
        path: ":itemId",
        component: TodolistItemViewComponent,
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/tasks",
  }
];
