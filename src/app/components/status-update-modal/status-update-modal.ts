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
  @Input() selectedState: string | null = null;
  @Output() save = new EventEmitter<{ state: string | null; comment: string }>();
  @Output() cancel = new EventEmitter<void>();

  expiryDate = '';
  expiryTime = '';
  comment = '';

  onSave(): void {
    this.save.emit({
      state: this.selectedState,
      comment: this.comment,
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
