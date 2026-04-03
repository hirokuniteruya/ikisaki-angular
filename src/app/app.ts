import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { MapArea } from "./components/map-area/map-area";
import { StatusUpdateModal } from "./components/status-update-modal/status-update-modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, MapArea, StatusUpdateModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('行き先掲示板');

  @ViewChild('mapArea') mapAreaComponent!: MapArea;

  showStatusModal = false;
  selectedDeskId = 0;
  selectedDeskName = '';
  selectedState: string = '';

  onDeskStateSelected(event: { deskId: number; deskName: string; state: string }): void {
    this.selectedDeskId = event.deskId;
    this.selectedDeskName = event.deskName;
    this.selectedState = event.state;
    this.showStatusModal = true;
  }

  onStatusModalSave(event: { state: string; comment: string; expiry: Date | null }): void {
    this.mapAreaComponent.saveState(this.selectedDeskId, event.state, event.comment, event.expiry);
    this.showStatusModal = false;
  }

  onStatusModalCancel(): void {
    this.showStatusModal = false;
  }
}
