export interface Response<T> {
  content: T;
  message: string;
}
export interface ResponseList<T> {
  content: T[];
  message: string;
  error: string;
}
