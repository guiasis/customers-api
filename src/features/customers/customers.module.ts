import { Module } from '@nestjs/common';
import { AwsModule } from 'src/core/aws/aws.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [AwsModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
