import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './types/create-customers.dto';
@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async createCustomer(createCustomerBody: CreateCustomerDto) {
    return await this.customersRepository.createCustomer(createCustomerBody);
  }
}
