import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CustomerDto } from './types/customers.dto';
import { Customer } from './types/customers.type';
import { UpdateCustomerDto } from './types/update-customers.dto';
@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async createCustomer(createCustomerBody: CustomerDto): Promise<Customer> {
    return await this.customersRepository.createCustomer(createCustomerBody);
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    return await this.customersRepository.getCustomerById(customerId);
  }

  async updateCustomer(
    customerId: string,
    updateCustomerBody: UpdateCustomerDto,
  ): Promise<void> {
    const customer = await this.customersRepository.getCustomerById(customerId);
    return await this.customersRepository.updateCustomer(
      updateCustomerBody,
      customer,
    );
  }

  async listCustomers(): Promise<Customer[]> {
    return await this.customersRepository.getAllCustomers();
  }

  async deleteCustomer(customerId: string): Promise<void> {
    return await this.customersRepository.deleteCustomer(customerId);
  }

  async searchCustomers(value: string | void): Promise<Customer[]> {
    if (!value) {
      return;
    }

    return await this.customersRepository.searchCustomer(value);
  }
}
