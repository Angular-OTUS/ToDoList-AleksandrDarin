import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {ToastService} from "../../services/toastService";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {

  protected readonly closeToastButtonTitle: string = 'X';
  protected toasts: string[] = []
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private toastsService: ToastService
  ) {}

  public ngOnInit(): void {
    this.toastsService.toasts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected removeToast(toastIndex: number): void {
    this.toastsService.removeToast(toastIndex);
  }
}
