import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Label } from '../models/Label.model';
import { LabelService } from '../services/label.service';

@Component({
  selector: 'app-word-selector',
  templateUrl: './word-selector.component.html',
  styleUrls: ['./word-selector.component.css']
})
export class WordSelectorComponent implements OnInit {

  @ViewChild('textToSelect') textToSelect: ElementRef | undefined;
  selectedWord: string = '';
  startPosition: number | undefined;
  endPosition: number | undefined;
  selectedLabel: Label | null = null;
  labels!: Label[] 
  constructor(private services: LabelService){}
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


  GetAllLabels() {
    this.services.getAll().subscribe(res => {
      console.log(res);
      this.labels = res;
    })
  }

  ngOnInit(): void {
  this.GetAllLabels()
  }

}
