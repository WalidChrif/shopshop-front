export interface Page<T> {
  content: T[];
  number: any;
  size: any;
  totalPages: number;
  totalElements: number;
}
