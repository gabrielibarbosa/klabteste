import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProdutosService } from "../core/services/produtos.service";
import { ProdutosComponent } from "./produtos.component";
import { ReactiveFormsModule } from "@angular/forms";
import {MatTableModule} from '@angular/material/table';

const route = [{component: ProdutosComponent, path: ''}]
@NgModule({
  imports: [HttpClientModule, MatTableModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(route)],
  declarations: [ProdutosComponent],
  providers: [ProdutosService]
})
export class ProdutosModule {}
