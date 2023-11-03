import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TDocument } from 'src/app/models/Annotation.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {
  DocumentForm!: FormGroup;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  constructor(private formBuilder: FormBuilder,
    private Service: DocumentService,
    private messageService: MessageService,
    // private labelNotificationService: LabelNotificationService
  ) { }

  onSubmit() {
    if (this.DocumentForm.valid) {
      const Data = this.DocumentForm.value as TDocument;
      this.Service.add(Data).subscribe((response) => {
        // Notify the ArticlesComponent that an article has been added
       // this.labelNotificationService.notifyLabelAdded();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Category added successfully' });
        this.closeAllModals()
      });
    }
  }

  showModalDialog() {
    this.displayModal = true;
    // console.log("Show modal dialog from childen")
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




  ngOnInit(): void {
    this.DocumentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

}
