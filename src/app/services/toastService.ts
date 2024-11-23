import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly _toasts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public get toasts$(): Observable<string[]> {
    return this._toasts$.asObservable();
  }

  public showToast(message: string): void {
    const updatedToasts: string[] = [...this._toasts$.value, message];
    this._toasts$.next(updatedToasts);
  }

  public removeToast(index: number): void {
    const updatedToasts: string[] = this._toasts$.value.filter((_, i) => i !== index);
    this._toasts$.next(updatedToasts);
  }
}
