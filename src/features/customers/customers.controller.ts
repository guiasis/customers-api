import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './types/create-customers.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersSvc: CustomersService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Criar cliente' })
  getTextVersions(@Body() createCustomerBody: CreateCustomerDto) {
    return this.customersSvc.createCustomer(createCustomerBody);
  }
}
