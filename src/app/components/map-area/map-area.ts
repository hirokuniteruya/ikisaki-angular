import { Component, Output, EventEmitter } from '@angular/core';
import { DeskComponent } from "./desk/desk";
import { Desk as DeskType } from "../../types/Desk";
import { User } from '../../types/User';
import { db } from '../../temporary-db/temporary-db';

@Component({
  selector: 'app-map-area',
  imports: [DeskComponent],
  templateUrl: './map-area.html',
  styleUrl: './map-area.scss',
})
export class MapArea {
  @Output() stateSelected = new EventEmitter<{ deskId: number; deskName: string; state: string }>();

  desks: DeskType[] = [];

  users: User[] = [];

  ngOnInit() {
    // デスクとユーザーの初期化などのロジックをここに追加できます
    this.desks = db.desks;
    this.users = db.users;

    // 各デスクにユーザーを割り当て
    this.desks.forEach(desk => {
      const user = this.users.find(u => u.deskId === desk.id);
      if (user) {
        desk.user = user;
      }
    });
  }

  onDeskPositionChanged(event: { id: number; x: number; y: number }): void {
    const desk = this.desks.find(d => d.id === event.id);
    if (desk) {
      desk.x = event.x;
      desk.y = event.y;
      // TODO: ここでバックエンド/データベースに位置情報を保存
      console.log(`Desk ${event.id} moved to (${event.x}, ${event.y})`);
    }
  }

  onDeskStateSelected(event: { deskId: number; deskName: string; state: string }): void {
    if (event.state === '' || event.state === 'available') {
      this.saveState(event.deskId, event.state, '', null);
    } else {
      this.stateSelected.emit(event);
    }
  }

  saveState(deskId: number, state: string, comment: string, expiry: Date | null): void {
    const desk = this.desks.find(d => d.id === deskId);
    if (!desk) return;
    if (!desk.user) return;
    
    if (state === '' || state === 'available') {
      desk.user.state = state;
      desk.user.comment = '';
      desk.user.expiry = null;
      console.log(`Desk ${deskId} state updated to "${state}"`);
    } else {
      desk.user.state = state;
      desk.user.comment = comment;
      desk.user.expiry = expiry ?? null;
      console.log(`Desk ${deskId} state updated to "${state}" with comment: "${comment}" and expiry: ${expiry}`);
    }

    // TODO: ここでバックエンド/データベースに保存
    console.log(`Desk ${deskId} state updated to "${state}" with comment: "${comment}"`);
  }
}
