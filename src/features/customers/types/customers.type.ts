export class Customer {
  _id: string;
  name: string;
  email: string;
  document: string;
  createdAt: string;
  updatedAt: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
