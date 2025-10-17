export interface Timer {
  id: number;
  title: string;
  initialSeconds: number;
  currentSeconds: number;
  isActive: boolean;
}
