import { Component, inject, Input } from '@angular/core';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule ,MaterialModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
}
