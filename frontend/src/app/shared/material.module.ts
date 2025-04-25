import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';

const materialComponents = [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
]
@NgModule({
  imports: [
    AsyncPipe,
    ...materialComponents

  ],
  exports: [AsyncPipe, ...materialComponents
  ]
})
export class MaterialModule {}
