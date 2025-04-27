import { Component } from '@angular/core';
import { IVendas } from '../core/interfaces/vendas.interface';
import { VendasService } from '../core/services/vendas.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.scss'
})
export class VendasComponent {
 displayedColumns: string[] = [
    'id',
    'comprador',
    'quantidades',
    'produtoId',
    'totalVenda',
  ];
  listaVendas: Array<IVendas> = [];

  form: FormGroup;
  listaVendasFiltrados: Array<IVendas> = [];

  filtroPorTotalVenda = [
    { label: 'Apartir de R$25 reais', value: 25 },
    { label: 'Apartir de R$50 reais', value: 50 },
    { label: 'Apartir de R$100 reais', value: 100 },
    { label: 'Apartir de R$200 reais', value: 200 },
  ];

  constructor(
      private vendasService: VendasService,
      private fb: FormBuilder,
      
    ) {
      this.form = this.fb.group({
        comprador: [''],
        totalVenda: [''],
      });
    }

    ngOnInit(): void {
      this.listarVendas();
      this.form.valueChanges.subscribe(() => this.aplicarFiltros());
    }

    listarVendas() {
      this.vendasService.getVendas().subscribe((vendas) => {
        this.listaVendas = vendas;
        this.listaVendasFiltrados =  this.listaVendas
      });
    }

    aplicarFiltros(): void {
      const { comprador, totalVenda } = this.form.value;
  
      this.listaVendasFiltrados = this.listaVendas.filter((venda) => {
        const nomeFiltro =
          !comprador || venda.comprador.toLowerCase().includes(comprador.toLowerCase());
  
        const precoMimino = totalVenda;
        const faixaPrecos = !precoMimino || venda.totalVenda <= precoMimino;
  
    
        return nomeFiltro && faixaPrecos;
      });
    }
}
