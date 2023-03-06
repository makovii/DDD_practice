import { Auth } from "src/auth/repository/auth.model";

export class CustomerDto {
  auth_id: Auth;
  name: string;
  email: string;
  balance: number;
  currency: string;
}