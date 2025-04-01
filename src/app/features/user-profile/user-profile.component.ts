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
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
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

  // Agrega una nueva signal para controlar la carga inicial
  loadingInitialData = signal(false);

  async loadUserData() {
    this.loadingInitialData.set(true); // Activar loading al inicio

    try {
      const result = await this.userDataService.getCompleteUserProfile();

      if (!result) {
        console.warn('No user profile or user data found');
        return;
      }

      const { profile, data } = result;

      this.profileForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        birthDate: data.birthDate,
        gender: data.gender,
        occupation: data.occupation,
      });
    } catch (error) {
      console.error('❌ Error al cargar datos del usuario:', error);
      this.showError('Error al cargar el perfil');
    } finally {
      this.loadingInitialData.set(false); // Desactivar loading al final
    }
  }

  async onSubmit() {
    if (!this.profileForm.valid) {
      this.showError('Formulario inválido');
      return;
    }

    this.loading.set(true); // Activar el loading

    try {
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

      await this.userDataService.updateUserData(formValue.id, input);
      this.showSuccess('Perfil actualizado correctamente');
    } catch (error: unknown) {
      console.error('🚀 ~ onSubmit ~ error:', error);
      // Manejo de errores existente...
    } finally {
      this.loading.set(false); // Desactivar el loading siempre
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
