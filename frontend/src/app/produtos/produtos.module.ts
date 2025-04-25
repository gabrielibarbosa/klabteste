import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProdutosService } from '../core/services/produtos.service';
import { MaterialModule } from '../shared/material.module';
import { ProdutosComponent } from './produtos.component';


const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
   
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
    ProdutosComponent,
  ],
  providers: [ProdutosService]
})
export class ProdutosModule {}
