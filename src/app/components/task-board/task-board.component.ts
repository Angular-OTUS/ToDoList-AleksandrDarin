import {Component, OnInit} from '@angular/core';
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
export class TaskBoardComponent implements OnInit {

  protected currentLang: string = 'en';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.setDefaultLangConfig();
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
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

  private setDefaultLangConfig(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
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
