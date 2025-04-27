import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { VendasComponent } from './vendas.component';
import { RouterModule, Routes } from '@angular/router';
import { VendasService } from '../core/services/vendas.service';

const routes: Routes = [
  {
    path: '',
    component: VendasComponent,
   
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    VendasComponent,
  ],
  providers: [VendasService]
})
export class VendasModule { }
