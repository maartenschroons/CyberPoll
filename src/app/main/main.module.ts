import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
