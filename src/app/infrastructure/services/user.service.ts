import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../../core/domain/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Eve' }
  ];
  private readonly DELAY = 300; 

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(this.DELAY));
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    const newId = this.users.length
      ? Math.max(...this.users.map(u => u.id)) + 1
      : 1;
    const created: User = { ...user, id: newId };

    this.users.push(created);
    return of(created).pipe(delay(this.DELAY));
  }

  updateUser(user: User): Observable<User> {
    const idx = this.users.findIndex(u => u.id === user.id);

    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...user };
      return of(this.users[idx]).pipe(delay(this.DELAY));
    }
    return of(user).pipe(delay(this.DELAY));
  }

  deleteUser(id: number): Observable<null> {
    this.users = this.users.filter(u => u.id !== id);
    return of(null).pipe(delay(this.DELAY));
  }

  getUserDetails(id: number): Observable<{ details: string }> {
    const user = this.users.find(u => u.id === id);
    const details = user ? `More info about ${user.name}` : 'Not found';
    
    return of({ details }).pipe(delay(this.DELAY));
  }
}
