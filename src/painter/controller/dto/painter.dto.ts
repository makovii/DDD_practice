import { Auth } from "src/auth/repository/auth.model";

export class PainterDto {
  name: string;
  email: string;
  auth_id: Auth;
  balance: number;
  currency: string;
}