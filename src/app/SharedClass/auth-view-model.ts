export interface AuthViewModel {
  message: string;
  isAuthenticated: boolean;
  userName: string;
  email: string;
  roles: string;
  token: string;
  expiresOn?: Date | null;
  claims?: any[];
}
