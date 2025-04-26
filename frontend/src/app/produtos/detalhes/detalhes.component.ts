import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { VendasDTO } from '../../core/dto/vendas.dto';
import { IProdutos } from '../../core/interfaces/produtos.interface';
import { VendasService } from '../../core/services/vendas.service';
import { DialogContentComponent } from '../../shared/components/diolog-content/dialog-content.component';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { MaterialModule } from '../../shared/material.module';

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
    private location: Location,
    private dialog: MatDialog,
    private vendasService: VendasService,
    private snackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    const produtoParam = this.route.snapshot.queryParamMap.get('produto');
    if (produtoParam) {
      this.produto = JSON.parse(produtoParam);
    }
  }

  voltar() {
    this.location.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '800px',
      data: { produto: this.produto },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cadastrarVenda(result);
      }
    });
  }

  cadastrarVenda(venda: any): void {
    console.log('Cadastrar venda:', venda);

    const totalVenda = venda.quantidade * this.produto.preco;
    const vendaDto: VendasDTO = {
      comprador: venda.nome,
      produto_id: this.produto.id,
      quantidades: venda.quantidade,
      total_venda: totalVenda
    }
    this.vendasService
    .insertVenda(vendaDto)
    .subscribe((response) => {
    this.openSnackBar();
    })
  }

  openSnackBar() {
    let durationInSeconds = 600;

    this.snackBar.openFromComponent(NotificationComponent, {
      duration: durationInSeconds * 1000,
    });
  }

}
