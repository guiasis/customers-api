import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Id do cliente',
    type: String,
    example: '4d049a9a-24df-4de5-a37c-8860c201a3b5',
  })
  customerId: string;

  constructor(partial: Partial<CustomerParamDto>) {
    Object.assign(this, partial);
  }
}
