import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelComponent } from './components/label/label.component';
import { DocumentComponent } from './components/document/document.component';
import { AnnotationsComponent } from './components/annotations/annotations.component';

const routes: Routes = [
{ path: "", component: LabelComponent },
{ path: "doc", component: DocumentComponent },
{ path: "annotations/:id", component: AnnotationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
