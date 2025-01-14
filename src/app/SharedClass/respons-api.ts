export interface ResponsAPI<T = any> {
  succeeded: boolean;
  message: string;
  data: T;
}
