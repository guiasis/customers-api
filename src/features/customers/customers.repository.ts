import { Injectable } from '@nestjs/common';
import { DynamoDBService } from 'core/aws/dynamodb/dynamodb.service';
import { CustomerDto } from './types/customers.dto';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './types/customers.type';
import { UpdateCustomerDto } from './types/update-customers.dto';

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
      PK: 'CUSTOMERS',
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
        ':pk': `CUSTOMERS`,
        ':sk': `CUSTOMER#${customerId}`,
      },
    };

    const customer = await this.dynamoDBSvc.getItems(params);

    if (!customer.Items || customer.length === 0) {
      return null;
    }

    return CustomerDto.fromDynamo(customer?.Items[0]);
  }

  async updateCustomer(
    updateInfos: UpdateCustomerDto,
    customer: Customer,
  ): Promise<void> {
    const newCustomer = {
      ...customer,
      ...updateInfos,
    };

    const customerKey = {
      PK: `CUSTOMERS`,
      SK: `CUSTOMER#${customer._id}`,
    };

    const customerUpdateExpression = `set
      Content.name = :name,
      Content.email = :email,
      Content.document = :document,
      #UpdatedAt = :UpdatedAt`;

    const customerAttributeNames = {
      '#UpdatedAt': 'UpdatedAt',
    };
    const customerAttributeValues = {
      ':name': newCustomer.name,
      ':email': newCustomer.email,
      ':document': newCustomer.document,
      ':UpdatedAt': new Date().toISOString(),
    };

    await this.dynamoDBSvc.update(
      customerKey,
      customerUpdateExpression,
      customerAttributeNames,
      customerAttributeValues,
    );

    return;
  }

  async getAllCustomers(): Promise<Customer[]> {
    const params = {
      KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
      },
      ExpressionAttributeValues: {
        ':pk': `CUSTOMERS`,
        ':sk': `CUSTOMER#`,
      },
    };

    const customers = await this.dynamoDBSvc.getItems(params);

    if (!customers.Items || customers.length === 0) {
      return [];
    }

    return customers.Items.map((customerRaw) =>
      CustomerDto.fromDynamo(customerRaw),
    );
  }
}
