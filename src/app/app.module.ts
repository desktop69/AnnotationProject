import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordSelectorComponent } from './word-selector/word-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { LabelComponent } from './components/label/label.component';
import { UpdateLabelComponent } from './components/update-label/update-label.component';
import { AddLabelComponent } from './components/add-label/add-label.component';
// prime ng imports 
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [
    AppComponent,
    WordSelectorComponent,
    LabelComponent,
    UpdateLabelComponent,
    AddLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule,
    ConfirmPopupModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule


  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
