import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import { ProdutosService } from "../core/services/produtos.service";
import { IProdutos } from "../core/interfaces/produtos.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

@Component({
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'

})
export class ProdutosComponent implements OnInit {
  
  displayedColumns: string[] = ['nome', 'quantidadeTotal', 'quantidadeDefeitos', 'quantidadeDisponivelVenda', 'preco'];
  listaProdutos: Array<IProdutos> = [];

  form: FormGroup;
  listaProdutosFiltrados:  Array<IProdutos> = [];

  filtroPorPrecos = [
    { label: 'Até R$25 reais', value: 25},
    { label: 'Até R$50 reais', value: 50},
    { label: 'Até R$100 reais', value: 100},
    { label: 'Até R$200 reais', value: 200},
  ]
  
  constructor(
    private produtosService: ProdutosService,
    private router:Router,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      nome: [''],
      filtroPorPrecos: [''],
      quantidadeMaiorQue: ['']
    });
  }
 
  ngOnInit(): void {
    this.listarProdutos();
    this.form.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  listarProdutos() {
    this.produtosService.getProdutos()
    .subscribe((produtos)=>{
      this.listaProdutos = produtos;
      this.listaProdutosFiltrados = this.listaProdutos
    })
  }

  redirecionarDetalhes(produto){
    this.router.navigate(['/produtos/detalhes']);
  }

  aplicarFiltros(): void {
    const { nome, filtroPorPrecos, quantidadeMaiorQue } = this.form.value;
  
    this.listaProdutosFiltrados = this.listaProdutos.filter(produto => {
      const nomeFiltro = !nome || produto.nome.toLowerCase().includes(nome.toLowerCase());
  
      const precoMaximo = filtroPorPrecos;
      const faixaPrecos = !precoMaximo || produto.preco <= precoMaximo;
  
      const filtroPorQuantidade = !quantidadeMaiorQue || produto.quantidadeTotal > +quantidadeMaiorQue;  
      return nomeFiltro && faixaPrecos && filtroPorQuantidade;
    });
  }
  
  
}
