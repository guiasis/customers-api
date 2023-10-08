import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CustomerDto } from './types/create-customers.dto';
import { Customer } from './types/customers.type';
@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async createCustomer(createCustomerBody: CustomerDto): Promise<Customer> {
    return await this.customersRepository.createCustomer(createCustomerBody);
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    return await this.customersRepository.getCustomerById(customerId);
  }
}
