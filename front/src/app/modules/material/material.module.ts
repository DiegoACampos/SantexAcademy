import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIALCOMPONENTS = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule
]

@NgModule({
  imports: [MATERIALCOMPONENTS],
  exports: [MATERIALCOMPONENTS]
})
export class MaterialModule { }
