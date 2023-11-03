import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentNotificationService {
  private documentAddedSource = new Subject<void>();
  documentAdded$ = this.documentAddedSource.asObservable();


  notifyLabelAdded() {
    this.documentAddedSource.next();
  }
}
