import { Routes } from '@angular/router';
import {TodolistComponent} from "./components/todolist/todolist.component";
import {TodolistItemViewComponent} from "./components/todolist-item-view/todolist-item-view.component";
import {TaskBoardComponent} from "./components/task-board/task-board.component";
import {BoardComponent} from "./components/board/board.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "backlog/tasks",
    pathMatch: "full"
  },
  {
    path: "",
    component: TaskBoardComponent,
    children: [
      {
        path: "backlog/tasks",
        component: TodolistComponent,
        children: [
          {
            path: ":itemId",
            component: TodolistItemViewComponent
          }
        ]
      },
      {
        path: "board",
        component: BoardComponent
      },
    ]
  },
  {
    path: "**",
    redirectTo: "/",
  }
];
