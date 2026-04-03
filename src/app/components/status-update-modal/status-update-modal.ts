import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-update-modal',
  imports: [FormsModule],
  templateUrl: './status-update-modal.html',
  styleUrl: './status-update-modal.scss',
})
export class StatusUpdateModal {
  @Input() isOpen = false;
  @Input() deskName = '';
  @Input() selectedState: string = '';
  @Output() save = new EventEmitter<{ state: string; comment: string; expiry: Date | null }>();
  @Output() cancel = new EventEmitter<void>();

  expiryDate = '';
  expiryTime = '';
  comment = '';

  onSave(): void {
    this.save.emit({
      state: this.selectedState,
      comment: this.comment,
      expiry: this.selectedState === 'occupied' ? new Date(`${this.expiryDate}T${this.expiryTime}`) : null,
    });
    this.resetModal();
  }

  onCancel(): void {
    this.cancel.emit();
    this.resetModal();
  }

  private resetModal(): void {
    this.comment = '';
  }

  onOverlayClick(): void {
    this.onCancel();
  }
}
