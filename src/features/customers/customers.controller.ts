import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersSvc: CustomersService) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Consultar versões do excerto comparação' })
  getTextVersions(@Param() params) {
    return `Hello ${params.id}`;
  }
}
