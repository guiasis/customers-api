import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Customer } from './customers.type';

export class CustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
    example: 'João Silva',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'E-mail do cliente',
    type: String,
    example: 'teste@teste.com.br',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Documento do cliente',
    type: String,
    example: '94911190019',
  })
  document: string;

  constructor(partial: Partial<CustomerDto>) {
    Object.assign(this, partial);
  }

  public static fromDynamo(entity: any): Customer {
    const customer = new Customer(entity.Content);

    customer.createdAt = entity.CreatedAt;
    customer.updatedAt = entity.UpdatedAt;

    return customer;
  }
}
