import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Label } from 'src/app/models/Label.model';
import { LabelNotificationService } from 'src/app/services/label-notification.service';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {
  labelForm!: FormGroup;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;

  constructor(private formBuilder: FormBuilder,
    private Service: LabelService,
    private messageService: MessageService,
     private labelNotificationService: LabelNotificationService
  ) { }

  onSubmit() {
    if (this.labelForm.valid) {
      const Data = this.labelForm.value as Label;
      this.Service.add(Data).subscribe((response) => {
        // Notify the ArticlesComponent that an article has been added
        this.labelNotificationService.notifyLabelAdded();
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
    this.labelForm = this.formBuilder.group({
      labelName: ['', [Validators.required]],
      labelColor: ['', [Validators.required]]

    });

  }
}
