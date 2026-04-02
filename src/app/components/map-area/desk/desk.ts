import { Component, Input, Output, EventEmitter, ChangeDetectorRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-desk',
  imports: [],
  templateUrl: './desk.html',
  styleUrl: './desk.scss',
})
export class Desk {
  @Input() desk!: { id: number; name: string; x: number; y: number; z: number; user?: { id: number; name: string; state: string; comment?: string; }; };
  @Output() positionChanged = new EventEmitter<{ id: number; x: number; y: number }>();
  @Output() stateSelected = new EventEmitter<{ deskId: number; deskName: string; state: string | null }>();

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private initialX = 0;
  private initialY = 0;

  showContextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;
  showTooltip = false;
  tooltipX = 0;
  tooltipY = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.initialX = this.desk.x;
    this.initialY = this.desk.y;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;

    this.desk.x = this.initialX + deltaX;
    this.desk.y = this.initialY + deltaY;
    
    this.cdr.markForCheck();
  };

  private onMouseUp = (): void => {
    if (this.isDragging) {
      this.isDragging = false;
      this.positionChanged.emit({
        id: this.desk.id,
        x: this.desk.x,
        y: this.desk.y,
      });
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  getBackgroundColor(): string {
    if (!this.desk.user) {
      return '#f0f0f0'; // デフォルト色（グレー）
    }
    
    switch (this.desk.user.state) {
      case 'available':
        return '#F5E6D3'; // ベージュ色
      case 'occupied':
        return '#87CEEB'; // 水色
      default:
        return '#f0f0f0'; // デフォルト色
    }
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.showContextMenu = true;
  }

  onStateChange(state: string | null): void {
    this.stateSelected.emit({
      deskId: this.desk.id,
      deskName: this.desk.name,
      state: state,
    });
    this.showContextMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.desk') && !target.closest('.context-menu')) {
      this.showContextMenu = false;
    }
  }

  onMouseEnter(event: MouseEvent): void {
    if (!this.isDragging) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.tooltipX = rect.left;
      this.tooltipY = rect.top - 10;
      this.showTooltip = true;
    }
  }

  onMouseLeave(): void {
    this.showTooltip = false;
  }
}
