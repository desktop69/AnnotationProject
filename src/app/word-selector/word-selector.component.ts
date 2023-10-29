import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  getSelectedText(event: MouseEvent): void {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString().trim();

      if (selectedText !== '') {
        this.selectedWord = selectedText;

        const range = selection.getRangeAt(0);
        const textToSelect = this.textToSelect?.nativeElement;

        if (textToSelect) {
          const rangeClone = range.cloneRange();

          rangeClone.selectNodeContents(textToSelect);
          rangeClone.setEnd(range.endContainer, range.endOffset);

          this.startPosition = rangeClone.toString().indexOf(selectedText);
          this.endPosition = this.startPosition !== -1 ? this.startPosition + selectedText.length : -1;
        }
      }
    }
  }
  ngOnInit(): void {
  }

}
