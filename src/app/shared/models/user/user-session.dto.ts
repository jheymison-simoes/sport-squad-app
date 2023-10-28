export interface UserSession {
  userId: string;
  userName: string;
  firstName: string;
  token: string;
  role: string;
  expireIn: number;
  expireTimeSpan: Date;
  imageUrl: string;
}
