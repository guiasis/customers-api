import { Injectable } from '@nestjs/common';
import { DynamoDBService } from 'core/aws/dynamodb/dynamodb.service';
import { CreateCustomerDto } from './types/create-customers.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersRepository {
  constructor(private readonly dynamoDBSvc: DynamoDBService) {}

  async createCustomer(customer: CreateCustomerDto) {
    const createdAt = new Date().toISOString();
    const uuid = uuidv4();

    const params = {
      Content: {
        ...customer,
        _id: uuid,
      },
      PK: 'CUSTOMER',
      SK: `CUSTOMER#${uuid}`,
      CreatedAt: createdAt,
      UpdatedAt: null,
      Deleted: 'N',
    };

    await this.dynamoDBSvc.create(params);

    return CreateCustomerDto.fromDynamo(params);
  }
}
