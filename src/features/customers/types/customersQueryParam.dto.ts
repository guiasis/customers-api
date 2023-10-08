import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomersQueryParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      'Valor desejado na procura por cliente(seja nome, e-mail ou documento)',
    type: String,
    example: 'joão',
  })
  value: string;

  constructor(partial: Partial<CustomersQueryParamDto>) {
    Object.assign(this, partial);
  }
}
