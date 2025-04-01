import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDataService } from '../../core/services/user-data.service';
import { AuthService } from '../../core/services/auth.service';
import { UserData, UpdateUserDataInput } from '../../models/API';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class UserProfileComponent {
  profileForm: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
    });

    this.loadUserData();
  }

  async loadUserData() {
    try {
      const result = await this.userDataService.getCompleteUserProfile();

      if (!result) {
        console.warn('No user profile or user data found');
        return;
      }

      const { profile, data } = result;

      console.log('🟢 Perfil:', profile);
      console.log('🟢 Datos:', data);

      // aquí puedes continuar asignando a this.user o similar...
    } catch (error) {
      console.error('❌ Error al cargar datos del usuario:', error);
    }
  }

  async onSubmit() {
    if (!this.profileForm.valid) {
      this.showError('Formulario inválido');
      return;
    }

    const email = await this.authService.getCurrentUserEmail();
    if (!email) {
      this.showError('Usuario no autenticado');
      return;
    }

    const formValue = this.profileForm.value;
    const input: UpdateUserDataInput = {
      ...formValue,
      email,
    };

    try {
      await this.userDataService.updateUserData(formValue.id, input);
      this.showSuccess('Perfil actualizado correctamente');
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
      this.showError('Error actualizando el perfil');
    }
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
