import { Component, Output, EventEmitter } from '@angular/core';
import { Desk } from "./desk/desk";

@Component({
  selector: 'app-map-area',
  imports: [Desk],
  templateUrl: './map-area.html',
  styleUrl: './map-area.scss',
})
export class MapArea {
  @Output() stateSelected = new EventEmitter<{ deskId: number; deskName: string; state: string | null }>();

  // 仮のデータベース
  db = {
    desks: [
      { id: 1, name: 'Desk 1', x: 100, y: 100, z: 0 },
      { id: 2, name: 'Desk 2', x: 200, y: 100, z: 0 },
      { id: 3, name: 'Desk 3', x: 100, y: 200, z: 0 },
      { id: 4, name: 'Desk 4', x: 200, y: 200, z: 0 },
    ],
    users: [
      { id: 1, name: 'User 1', deskId: 1, state: 'available', comment: 'I am available!' },
      { id: 2, name: 'User 2', deskId: 2, state: 'occupied', comment: 'I am occupied!' },
      { id: 3, name: 'User 3', deskId: 3, state: 'occupied', comment: 'I am occupied!' },
    ]
  };

  desks: { id: number; name: string; x: number; y: number; z: number, user?: { id: number; name: string; state: string; comment: string; } }[] = [];

  users: { id: number; name: string; deskId: number; state: string; comment: string }[] = [];

  ngOnInit() {
    // デスクとユーザーの初期化などのロジックをここに追加できます
    this.desks = this.db.desks;
    this.users = this.db.users;

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

  onDeskStateSelected(event: { deskId: number; deskName: string; state: string | null }): void {
    this.stateSelected.emit(event);
  }

  saveStateWithComment(deskId: number, state: string | null, comment: string): void {
    const desk = this.desks.find(d => d.id === deskId);
    if (!desk) return;

    if (!desk.user) {
      desk.user = { id: 0, name: 'Unknown', state: '', comment: '' };
    }

    if (state === null) {
      // stateのみをクリア
      desk.user.state = '';
      desk.user.comment = '';
    } else {
      // stateとコメントを保存
      desk.user.state = state;
      desk.user.comment = comment;
    }

    // TODO: ここでバックエンド/データベースに保存
    console.log(`Desk ${deskId} state updated to "${state}" with comment: "${comment}"`);
  }
}
