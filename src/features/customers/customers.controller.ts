import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerDto } from './types/customers.dto';
import { Customer } from './types/customers.type';
import { UpdateCustomerDto } from './types/update-customers.dto';

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

  @Put(':customerId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Atualizar os dados de um cliente por meio do seu id',
  })
  updateCustomer(
    @Body() updateCustomerBody: UpdateCustomerDto,
    @Param() param: { customerId: string },
  ): Promise<void> {
    return this.customersSvc.updateCustomer(
      param.customerId,
      updateCustomerBody,
    );
  }

  @Get('list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter uma lista de clientes' })
  listCustomers(): Promise<Customer[]> {
    return this.customersSvc.listCustomers();
  }
}
