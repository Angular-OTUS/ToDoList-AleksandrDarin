import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterOutlet,
    TranslatePipe
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  protected getCurrentTabName(): string | undefined {
    const currentPath: string = this.router.url.split('/').filter(Boolean).join('/');
    const route = this.routes
      .find(route => currentPath.startsWith(route.path));

    return route?.name;
  }

  protected getLocalizedTabName(): string {
    return this.translate.instant(this.getCurrentTabName()!);
  }

  protected isCurrentRoute(route: string): boolean {
    return this.getCurrentTabName() === route;
  }

  protected readonly routes = [
    {
      name: 'Backlog',
      path: 'backlog/tasks'
    },
    {
      name: 'Board',
      path: 'board'
    }
  ];
}
