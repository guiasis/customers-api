import { Injectable } from '@nestjs/common';
import { DynamoDBService } from 'core/aws/dynamodb/dynamodb.service';
import { CustomerDto } from './types/create-customers.dto';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './types/customers.type';

@Injectable()
export class CustomersRepository {
  constructor(private readonly dynamoDBSvc: DynamoDBService) {}

  async createCustomer(customer: CustomerDto): Promise<Customer> {
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

    return CustomerDto.fromDynamo(params);
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    const params = {
      KeyConditionExpression: '#PK = :pk and #SK = :sk',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
      },
      ExpressionAttributeValues: {
        ':pk': `CUSTOMER`,
        ':sk': `CUSTOMER#${customerId}`,
      },
    };

    const customer = await this.dynamoDBSvc.getItems(params);

    if (!customer.Items || customer.length === 0) {
      return null;
    }

    return CustomerDto.fromDynamo(customer?.Items[0]);
  }
}
