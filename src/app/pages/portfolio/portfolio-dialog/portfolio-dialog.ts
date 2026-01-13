import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-portfolio-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './portfolio-dialog.html',
  styleUrl: './portfolio-dialog.scss',
})
export class PortfolioDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PortfolioDialog>);

  data = inject(MAT_DIALOG_DATA);

  form: FormGroup;
  coinList: any[] = [];

  constructor() {
    this.coinList = this.data.coins || [];
    const editData = this.data.element;

    this.form = this.fb.group({
      coinId: [editData?.coinId || '', Validators.required],
      amount: [editData?.amount || '', [Validators.required, Validators.min(0)]],
      cost: [editData?.cost || '', [Validators.required, Validators.min(0)]],
    });
  }

  save() {
    if (this.form.valid) {
      const selectedCoin = this.coinList.find((c) => c.id === this.form.value.coinId);

      this.dialogRef.close({
        ...this.form.value,
        name: selectedCoin?.name || this.data.element?.name,
        symbol: selectedCoin?.symbol || this.data.element?.symbol,
        image: selectedCoin?.image || this.data.element?.image,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
