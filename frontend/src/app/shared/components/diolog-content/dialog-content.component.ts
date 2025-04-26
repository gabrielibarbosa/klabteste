import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent implements OnInit {
  form!: FormGroup;
  produto: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produto = data.produto;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
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
