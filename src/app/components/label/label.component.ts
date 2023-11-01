import { Component, OnInit, ViewChild } from '@angular/core';
import { Label } from 'src/app/models/Label.model';
import { UpdateLabelComponent } from '../update-label/update-label.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { LabelService } from 'src/app/services/label.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabelNotificationService } from 'src/app/services/label-notification.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  labels!: Label[];
  @ViewChild(UpdateLabelComponent) updateComponent!: UpdateLabelComponent;
  @ViewChild(AddLabelComponent) addComponent!: AddLabelComponent;
  constructor(private services: LabelService,
    private messageService: MessageService,
    private labelNotificationService: LabelNotificationService,
    private confirmationService: ConfirmationService
  ) {
    this.labelNotificationService.articleAdded$.subscribe(() => {
      this.GetAllLabels();
    });
  }

  ngOnInit(): void {
    this.GetAllLabels();
  }
  GetAllLabels() {
    this.services.getAll().subscribe(res => {
      console.log(res);
      this.labels = res;
    })
  }
  OnDeleteLabel(id: number) {
 
  this.services.delete(id).subscribe(res => {
      this.GetAllLabels();
  })
 

  }
  openUpdateModal(app_obj: Label) {
    this.updateComponent.loadDataforUpdate(app_obj);
  }
  openAddModal() {
    this.addComponent.showModalDialog();
  }

  OnconfirmForDelete(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete this Label ?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.OnDeleteLabel(id);
        this.messageService.add({
          severity: "info",
          summary: "Success",
          detail: ("You have successfully deleted  " + name),
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: ("You have rejected Deleting " + name),
        });
      }
    });
  }
}
