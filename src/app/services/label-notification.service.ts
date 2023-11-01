import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelNotificationService {
  private labelAddedSource = new Subject<void>();
  articleAdded$ = this.labelAddedSource.asObservable();


  notifyLabelAdded() {
    this.labelAddedSource.next();
  }
}
