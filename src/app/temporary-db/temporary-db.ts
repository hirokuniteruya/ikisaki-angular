// 仮のデータベース
export const db = {
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
