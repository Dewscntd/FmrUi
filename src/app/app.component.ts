import { Component } from '@angular/core';

import { UserListComponent } from "./features/user/components/user-list/user-list.component";
import { UserOrdersComponent } from "./features/user/components/user-orders/user-orders.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserListComponent,
    UserOrdersComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}