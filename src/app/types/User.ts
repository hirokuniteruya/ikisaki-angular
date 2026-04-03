export type User = {
  id: number;
  name: string;
  deskId: number;
  state: string;
  comment?: string;
  expiry?: Date | null;
};
