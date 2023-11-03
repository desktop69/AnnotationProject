import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TDocument } from 'src/app/models/Annotation.model';
import { AnnotationService } from 'src/app/services/annotation.service';
import { DocumentService } from 'src/app/services/document.service';
import { AdddocumentComponent } from '../adddocument/adddocument.component';
import { UpdatedocumentComponent } from '../updatedocument/updatedocument.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents!: TDocument[];
  @ViewChild(UpdatedocumentComponent) updateComponent!: UpdatedocumentComponent;
  @ViewChild(AdddocumentComponent) addComponent!: AdddocumentComponent;
  constructor(private services: DocumentService,
    private messageService: MessageService,
  //  private labelNotificationService: LabelNotificationService,
    private confirmationService: ConfirmationService
  ) {
    // this.labelNotificationService.articleAdded$.subscribe(() => {
    //   this.GetAllDocuments();
    // });
  }
  ngOnInit(): void {
    this.GetAllDocuments();
  }
  GetAllDocuments() {
    this.services.getAll().subscribe(res => {
      console.log(res);
      this.documents = res;
    })
  }
  OnDeleteDocument(id: number) {
 
    this.services.delete(id).subscribe(res => {
        this.GetAllDocuments();
    })
   
  }

  openUpdateModal(app_obj: TDocument) {
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
        this.OnDeleteDocument(id);
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
