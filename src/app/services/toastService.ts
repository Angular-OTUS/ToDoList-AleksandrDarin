import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: string[] = [];
  private toastsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.toasts);

  constructor() {}

  public getObservableToastsSubject(): Observable<string[]> {
    return this.toastsSubject.asObservable();
  }

  public showToast(message: string) {
    const updatedToasts = [...this.toastsSubject.value, message];
    this.toastsSubject.next(updatedToasts);
  }

  public removeToast(index: number) {
    const updatedToasts = this.toastsSubject.value.filter((_, i) => i !== index);
    this.toastsSubject.next(updatedToasts);
  }
}
