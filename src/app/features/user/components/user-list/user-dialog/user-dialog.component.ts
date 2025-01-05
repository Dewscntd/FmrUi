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
  template: `
      <div>
      <h2>{{ data?.id ? 'Edit User' : 'Create User' }}</h2>
      <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>ID</label>
          </div>
          <div nz-form-control nz-col [nzSpan]="14">
            <input nz-input type="number" formControlName="id" />
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>Name</label>
          </div>
          <div nz-form-control nz-col [nzSpan]="14">
            <input nz-input type="text" formControlName="name" />
          </div>
        </div>

        <div style="text-align: right; margin-top: 16px;">
          <button nz-button nzType="default" (click)="onCancel()">Cancel</button>
          <button nz-button nzType="primary" [disabled]="form.invalid" style="margin-left: 8px;">Save</button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject<NzModalRef<UserDialogComponent, User | null>>(NzModalRef);
  
  
  form = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required]
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
    const user = this.form.getRawValue() as User;
    
    this.modalRef.close(user);
  }

  onCancel() {
    this.modalRef.close(null);
  }
}