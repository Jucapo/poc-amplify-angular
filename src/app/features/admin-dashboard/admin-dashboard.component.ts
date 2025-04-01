import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  UserAdminProfileWithUsersData,
  UserDataService,
} from '../../core/services/user-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // Datos y estado
  usersData = signal<UserAdminProfileWithUsersData | null>(null);
  displayedUsers = signal<any[]>([]);
  isLoading = signal(false);

  // Filtros y ordenamiento
  searchText = signal<string>('');
  roleFilter = signal<string>('');
  pageSize = signal<number>(10);
  sortState = signal<Sort>({ active: '', direction: 'asc' });

  // Paginación
  pageIndex = signal(0);
  pageSizeOptions = [5, 10, 25, 100];

  // Columnas para la tabla
  displayedColumns = [
    'email',
    'firstName',
    'lastName',
    'role',
    'phone',
    'actions',
  ];

  constructor(private userDataService: UserDataService) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.isLoading.set(true);
    try {
      const data = await this.userDataService.getAllUsers();
      this.usersData.set(data);
      this.applyFilters();
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  applyFilters() {
    if (!this.usersData()) {
      this.displayedUsers.set([]);
      return;
    }

    const searchText = this.searchText().toLowerCase();
    const roleFilter = this.roleFilter();

    // Combinamos profiles con data para tener toda la información junta
    const combinedUsers = this.combineUserData();

    let filtered = combinedUsers.filter((user) => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchText) ||
        (user.firstName && user.firstName.toLowerCase().includes(searchText)) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchText));

      const matchesRole = !roleFilter || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    // Ordenamiento
    if (this.sortState().active) {
      filtered = this.sortData(filtered, this.sortState());
    }

    // Paginación
    const startIndex = this.pageIndex() * this.pageSize();
    this.displayedUsers.set(
      filtered.slice(startIndex, startIndex + this.pageSize()),
    );
  }

  // Combina los datos de perfil con los datos de usuario
  private combineUserData(): any[] {
    if (!this.usersData()) return [];

    return this.usersData()!.profiles.map((profile) => {
      const userData =
        this.usersData()!.data.find((d) => d.email === profile.email) || {};
      return {
        ...profile,
        ...userData,
      };
    });
  }

  sortData(data: any[], sort: Sort): any[] {
    if (!sort.active || sort.direction === '') {
      return data;
    }

    return [...data].sort((a, b) => {
      const valueA = a[sort.active] ?? '';
      const valueB = b[sort.active] ?? '';

      if (valueA < valueB) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.applyFilters();
  }

  onSortChange(sortState: Sort) {
    this.sortState.set(sortState);
    this.applyFilters();
  }

  async refreshUsers() {
    this.pageIndex.set(0);
    await this.loadUsers();
  }

  totalUsers = computed(() => {
    return this.usersData()?.profiles?.length || 0;
  });
}
