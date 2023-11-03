import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TDocument } from 'src/app/models/Annotation.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-updatedocument',
  templateUrl: './updatedocument.component.html',
  styleUrls: ['./updatedocument.component.css']
})
export class UpdatedocumentComponent implements OnInit {
  app_obj!: TDocument;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  constructor(private services: DocumentService, private messageService: MessageService) { }
  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
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
  loadDataforUpdate(data: TDocument) {
    this.app_obj = data;
    this.showModalDialog();
  }
  updateLabel(id: number, doc: TDocument) {
    this.services.update(id, doc).subscribe(data => {
      console.log("data updated", data);
    })
  }

  onSubmit(): void {
    if (this.app_obj && this.app_obj.id) {
      this.updateLabel(this.app_obj.id, this.app_obj);
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Document Updated successfully' });
    }
    this.closeAllModals()
  }










  ngOnInit(): void {
  }

}
