import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { IProdutos } from '../../../core/interfaces/produtos.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-produto',
  standalone: true,
 imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  templateUrl: './dialog-editar-produto.component.html',
  styleUrl: './dialog-editar-produto.component.scss'
})
export class DialogEditarProdutoComponent {
  form!: FormGroup;
  produto: IProdutos;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produto = data.produto;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      preco: [''],
      quantidadeDisponivelVenda: [''],
      quantidadeDefeitos:  [''],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); 
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
