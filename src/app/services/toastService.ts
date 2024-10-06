import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public getObservableToastsSubject(): Observable<string[]> {
    return this.toastsSubject.asObservable();
  }

  public showToast(message: string): void {
    const updatedToasts = [...this.toastsSubject.value, message];
    this.toastsSubject.next(updatedToasts);
  }

  public removeToast(index: number): void {
    const updatedToasts = this.toastsSubject.value.filter((_, i) => i !== index);
    this.toastsSubject.next(updatedToasts);
  }
}
