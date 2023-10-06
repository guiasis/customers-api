import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamodb/dynamodb.service';

@Module({
  controllers: [],
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class AwsModule {}
