import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterOutlet
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {

  protected readonly componentTitle: string = 'Task Board';

  constructor(
    private router: Router
  ) {}

  protected getCurrentTabName(): string | undefined {
    const currentPath: string = this.router.url.split('/').filter(Boolean).join('/');
    const route = this.routes
      .find(route => currentPath.startsWith(route.path));

    return route?.name;
  }

  protected isCurrentRoute(route: string): boolean {
    return this.getCurrentTabName() === route;
  }

  protected readonly routes = [
    {
      name: 'BACKLOG',
      path: 'backlog/tasks'
    },
    {
      name: 'BOARD',
      path: 'board'
    }
  ];
}
