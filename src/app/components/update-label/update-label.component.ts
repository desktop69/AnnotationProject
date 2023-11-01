import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Label } from 'src/app/models/Label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-update-label',
  templateUrl: './update-label.component.html',
  styleUrls: ['./update-label.component.css']
})
export class UpdateLabelComponent implements OnInit {

  app_obj!: Label;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;

  constructor(private services: LabelService, private messageService: MessageService) { }

  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    //  this.displayModal = false;
    this.showPositionDialog('bottom');
  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal = false
    this.displayPosition = false;
  }
  loadDataforUpdate(data: Label) {
    this.app_obj = data;
    // console.log("hey from update component child: " + this.app_obj.name);
    this.showModalDialog();
    // console.log("App Obj Status:", this.app_obj.status);
  }
  updateLabel(id: number, label: Label) {
    this.services.update(id, label).subscribe(data => {
      console.log("data updated", data);
    })
  }
  onSubmit(): void {
    if (this.app_obj && this.app_obj.id) {
      this.updateLabel(this.app_obj.id, this.app_obj);
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Category Updated successfully' });
    }
    this.closeAllModals()
  }
  ngOnInit(): void {
  }

}
