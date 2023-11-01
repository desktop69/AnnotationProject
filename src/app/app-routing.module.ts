import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordSelectorComponent } from './word-selector/word-selector.component';
import { LabelComponent } from './components/label/label.component';

const routes: Routes = [
{ path: "word", component: WordSelectorComponent },
{ path: "", component: LabelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
