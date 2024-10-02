import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {ToastService} from "../../services/toastService";

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
export class ToastComponent implements OnInit {

  closeToastButtonTitle = 'X';
  toasts: string[] = []

  constructor(
    private toastsService: ToastService
  ) {}

  ngOnInit() {
    this.toastsService.getObservableToastsSubject().subscribe(toasts => {
      this.toasts = toasts;
    })
  }

  protected removeToast(toastIndex: number) {
    this.toastsService.removeToast(toastIndex);
  }
}
