import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerDto } from './types/create-customers.dto';
import { Customer } from './types/customers.type';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersSvc: CustomersService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Criar cliente' })
  createCustomer(@Body() createCustomerBody: CustomerDto): Promise<Customer> {
    return this.customersSvc.createCustomer(createCustomerBody);
  }

  @Get(':customerId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter um cliente por meio do id' })
  getCustomerById(@Param() param: { customerId: string }): Promise<Customer> {
    return this.customersSvc.getCustomerById(param.customerId);
  }
}
