import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-state-update-modal',
  imports: [FormsModule],
  templateUrl: './state-update-modal.html',
  styleUrl: './state-update-modal.scss',
})
export class StateUpdateModal {
  @Input() isOpen = false;
  @Input() deskName = '';
  @Input() selectedState: string | null = null;
  @Output() save = new EventEmitter<{ state: string | null; comment: string }>();
  @Output() cancel = new EventEmitter<void>();

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
