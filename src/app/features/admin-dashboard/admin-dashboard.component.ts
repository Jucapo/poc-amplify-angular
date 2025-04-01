import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // users = signal<CompleteUserProfile[]>([]);
  // filteredUsers = signal<CompleteUserProfile[]>([]);
  // searchText = signal('');
  // roleFilter = signal('');
  // sortColumn = signal('');
  // sortDirection = signal<'asc' | 'desc'>('asc');
  // isLoading = signal(false);

  // constructor(private userDataService: UserDataService) {}

  async ngOnInit() {
    // await this.loadUsers();
  }

  // async loadUsers() {
  //   this.isLoading.set(true);
  //   try {
  //     const users = await this.userDataService.getAllUsers();
  //     this.users.set(users);
  //     this.applyFilter();
  //   } catch (error) {
  //     console.error('Error loading users:', error);
  //   } finally {
  //     this.isLoading.set(false);
  //   }
  // }

  // applyFilter() {
  //   const searchText = this.searchText().toLowerCase();
  //   const roleFilter = this.roleFilter();

  //   this.filteredUsers.set(
  //     this.users().filter((user) => {
  //       const matchesSearch =
  //         user.profile.email.toLowerCase().includes(searchText) ||
  //         user.data.firstName.toLowerCase().includes(searchText) ||
  //         user.data.lastName.toLowerCase().includes(searchText);

  //       const matchesRole = !roleFilter || user.profile.role === roleFilter;

  //       return matchesSearch && matchesRole;
  //     }),
  //   );
  // }

  // sort(column: string) {
  //   if (this.sortColumn() === column) {
  //     this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     this.sortColumn.set(column);
  //     this.sortDirection.set('asc');
  //   }

  //   this.filteredUsers.set(
  //     [...this.filteredUsers()].sort((a, b) => {
  //       // Acceder a las propiedades según la estructura anidada
  //       const getValue = (user: CompleteUserProfile, col: string) => {
  //         if (col in user.profile) {
  //           return user.profile[col as keyof typeof user.profile] || '';
  //         }
  //         return user.data[col as keyof typeof user.data] || '';
  //       };

  //       const valueA = getValue(a, column);
  //       const valueB = getValue(b, column);

  //       if (valueA < valueB) return this.sortDirection() === 'asc' ? -1 : 1;
  //       if (valueA > valueB) return this.sortDirection() === 'asc' ? 1 : -1;
  //       return 0;
  //     }),
  //   );
  // }

  // async refreshUsers() {
  //   await this.loadUsers();
  // }
}
