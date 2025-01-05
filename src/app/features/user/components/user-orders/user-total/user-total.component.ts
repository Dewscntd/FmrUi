import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-total',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-total.component.html',
  styleUrl: './user-total.component.scss'
})
export class UserTotalComponent {
  @Input() total: number | null | undefined= 0;
}
