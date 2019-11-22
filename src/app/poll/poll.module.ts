import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PollComponent } from './poll.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DefaultValueAccessor
  ]
})
export class PollModule { }
