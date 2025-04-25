import {Component, OnInit} from "@angular/core";
import { ProdutosService } from "../core/services/produtos.service";
import { IProdutos } from "../core/interfaces/produtos.interface";

@Component({
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'

})
export class ProdutosComponent implements OnInit{
  displayedColumns: string[] = ['nome', 'quantidadeTotal', 'quantidadeDefeitos', 'quantidadeDisponivelVenda', 'preco'];
  dataSource: Array<IProdutos> = [];

  constructor(private produtosService: ProdutosService){}

  ngOnInit(): void {
    this.listarProdutos()
  }


  listarProdutos() {
    this.produtosService.getProdutos()
    .subscribe((produtos)=>{
      return this.dataSource = produtos;
    })
  }
}
