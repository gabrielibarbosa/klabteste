import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IProdutos } from '../../core/interfaces/produtos.interface';

@Component({
  standalone:true,
  imports:[MaterialModule, CommonModule],
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent {
  produto: IProdutos;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {

  }
  ngOnInit() {
    const produtoParam = this.route.snapshot.queryParamMap.get('produto');
    if (produtoParam) {
      this.produto = JSON.parse(produtoParam);
    }
  }

  voltar() {
    this.location.back(); // Volta para a rota anterior
  }

}
