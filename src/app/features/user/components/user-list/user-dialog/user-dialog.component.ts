import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  Inject
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from '../../../../../core/domain/user/user.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  selector: 'app-user-dialog',
  templateUrl: `./user-dialog.component.html`,
  styleUrl: './user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject<NzModalRef<UserDialogComponent, User | null>>(NzModalRef);
  
  
  form = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    details: [''] 
  });
  constructor(@Inject(NZ_MODAL_DATA) public data: User | null) {}

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
      if (this.data.id) {
        this.form.get('id')?.disable();
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      
      const user: User = {
        id: raw.id,
        name: raw.name,
        details: raw.details 
      } as User;
      this.modalRef.close(user);
    }
  }

  onCancel() {
    this.modalRef.close(null);
  }
}