import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { WordSelectorComponent } from './word-selector/word-selector.component';

const routes: Routes = [{ path: "", component: ArticlesComponent },
{ path: "word", component: WordSelectorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
