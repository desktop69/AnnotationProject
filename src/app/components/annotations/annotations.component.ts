import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Annotation, TDocument } from 'src/app/models/Annotation.model';
import { Label } from 'src/app/models/Label.model';
import { AnnotationService } from 'src/app/services/annotation.service';
import { DocumentService } from 'src/app/services/document.service';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  @ViewChild('textToSelect') textToSelect: ElementRef | undefined;
  selectedWord: string = '';
  startPosition: number | undefined;
  endPosition: number | undefined;
  selectedLabel: Label | null = null;
  labels!: Label[]
  document!: TDocument;
  annotationsList: Annotation[] = [];
  IdList: any[] = []

  constructor(
    private services: LabelService,
    private activatedRoute: ActivatedRoute,
    private servicesDocument: DocumentService,
    private serviceannotations: AnnotationService
  ) { }

  selectLabel(label: Label): void {
    this.selectedLabel = label;
    // console.log("curent label", this.selectedLabel)
  }
  getSelectedText(event: MouseEvent): void {
    const selection = window.getSelection();
    // console.log(selection)
    if (selection) {
      const selectedText = selection.toString().trim();
      if (selectedText !== '') {
        this.selectedWord = selectedText;
        const range = selection.getRangeAt(0);
        //  console.log(" rage is ", range)
        const textToSelect = this.textToSelect?.nativeElement;
        if (textToSelect) {
          const rangeClone = range.cloneRange();
          rangeClone.selectNodeContents(textToSelect);
          rangeClone.setEnd(range.endContainer, range.endOffset);
          this.startPosition = rangeClone.toString().indexOf(selectedText);
          this.endPosition = this.startPosition !== -1 ? this.startPosition + selectedText.length : -1;
          this.applyHighlight(range, selectedText);
          // collect data
          if (this.selectedLabel) {
            const newAnnotation = {
              start: this.startPosition,
              end: this.endPosition,
              label: this.selectedLabel.labelName,
              text: this.selectedWord
            }
            this.annotationsList.push(newAnnotation);
            console.log("annotation list is recording ", this.annotationsList);
          }

        }
      }
    }
  }

  applyHighlight(range: Range, selectedText: string): void {
    if (this.selectedLabel) {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-primary'); // Adding Bootstrap classes

      // Set the background color based on the selected label's color
      button.style.backgroundColor = this.selectedLabel.labelColor;

      const span = document.createElement('span');
      span.classList.add('badge', 'badge-secondary'); // Adding Bootstrap classes
      span.style.backgroundColor = 'white'; // Manually setting background color
      span.style.color = 'black'; // Manually setting text color
      span.textContent = this.selectedLabel.labelName; // Set the text content for the badge

      button.appendChild(document.createTextNode(selectedText));
      button.appendChild(span);

      range.deleteContents();
      range.insertNode(button);
    }


  }
  AddAnnotations() {
    // Add each annotations
    let addRequests = this.annotationsList.map(annotation => {
      return this.serviceannotations.add(annotation);
    });
    forkJoin(addRequests).subscribe((addedAnnotations) => {
      addedAnnotations.forEach((res: any) => {
        this.IdList.push(res.id);
      });
      this.document.annotations = this.IdList;
      this.servicesDocument.update(this.document.id, this.document).subscribe((data) => {
        console.log("added data ", data);
      });
    });
  }

  GetAllLabels() {
    this.services.getAll().subscribe(res => {
      console.log(res);
      this.labels = res;
    })
  }
  GetDocumentById() {
    this.servicesDocument.getById(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      this.document = data;
    })
  }
  ngOnInit(): void {
    this.GetAllLabels()
    this.GetDocumentById();
  }

}
