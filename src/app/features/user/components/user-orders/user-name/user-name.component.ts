import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-name',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-name.component.html',
  styleUrl: './user-name.component.scss'
})
export class UserNameComponent {
  @Input() userName: string | null | undefined = null;
}
