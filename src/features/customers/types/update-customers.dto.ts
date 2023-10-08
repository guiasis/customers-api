import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
    example: 'João Silva',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'E-mail do cliente',
    type: String,
    example: 'teste@teste.com.br',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Documento do cliente',
    type: String,
    example: '94911190019',
  })
  document?: string;

  constructor(partial: Partial<UpdateCustomerDto>) {
    Object.assign(this, partial);
  }
}
