import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProdutosService } from '../core/services/produtos.service';
import { IProdutos } from '../core/interfaces/produtos.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { empty, map, Observable, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditarProdutoComponent } from '../shared/components/dialog-editar-produto/dialog-editar-produto.component';
import { ProdutosUpdateDto } from '../core/dto/produtos-update.dto';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isValid } from '../core/utils/validacoes.utils';

@Component({
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss',
})
export class ProdutosComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'quantidadeTotal',
    'quantidadeDefeitos',
    'quantidadeDisponivelVenda',
    'preco',
    'editar',
    'detalhes'
  ];
  listaProdutos: Array<IProdutos> = [];

  form: FormGroup;
  listaProdutosFiltrados: Array<IProdutos> = [];

  filtroPorPrecos = [
    { label: 'Até R$25 reais', value: 25 },
    { label: 'Até R$50 reais', value: 50 },
    { label: 'Até R$100 reais', value: 100 },
    { label: 'Até R$200 reais', value: 200 },
  ];

  constructor(
    private produtosService: ProdutosService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: [''],
      filtroPorPrecos: [''],
      quantidadeMaiorQue: [''],
    });
  }

  ngOnInit(): void {
    this.listarProdutos();
    this.form.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  listarProdutos() {
    this.produtosService.getProdutos().subscribe((produtos) => {
      this.listaProdutos = produtos;
      this.listaProdutosFiltrados = this.listaProdutos;
    });
  }

  redirecionarDetalhes(produto) {
    this.router.navigate(['/produtos/detalhes'], {
      queryParams: { produto: JSON.stringify(produto) },
    });
  }

  aplicarFiltros(): void {
    const { nome, filtroPorPrecos, quantidadeMaiorQue } = this.form.value;

    this.listaProdutosFiltrados = this.listaProdutos.filter((produto) => {
      const nomeFiltro =
        !nome || produto.nome.toLowerCase().includes(nome.toLowerCase());

      const precoMaximo = filtroPorPrecos;
      const faixaPrecos = !precoMaximo || produto.preco <= precoMaximo;

      const filtroPorQuantidade =
        !quantidadeMaiorQue ||
        produto.quantidadeDisponivelVenda > +quantidadeMaiorQue;
      return nomeFiltro && faixaPrecos && filtroPorQuantidade;
    });
  }
  editarProdutoModal(produto: IProdutos) {
    const dialogRef = this.dialog.open(DialogEditarProdutoComponent, {
      width: '800px',
      data: { produto: produto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result){
        return;
      }

      this.editarProduto(produto, result)
      
     
  });
}

  editarProduto(produto:IProdutos, produtoEditado){
   
    const produtoUpdateDto: ProdutosUpdateDto = {
      id: produto.id,
      ...(isValid(produtoEditado.preco) && { preco: produtoEditado.preco }),
      ...(isValid(produtoEditado.quantidadeDefeitos) && { quantidadeDefeitos: produtoEditado.quantidadeDefeitos }),
      ...(isValid(produtoEditado.quantidadeDisponivelVenda) && { quantidadeDisponivelVenda: produtoEditado.quantidadeDisponivelVenda })
    };

    console.log('Produto editado para envio:', produtoUpdateDto);
    this.produtosService.updateProduto(produtoUpdateDto).subscribe((response) => {
      this.listarProdutos();
      this.openSnackBar();
      });

    }
 openSnackBar() {
    let durationInSeconds = 5;

    this.snackBar.openFromComponent(NotificationComponent, {
      duration: durationInSeconds * 1000,
    });
  }
}
