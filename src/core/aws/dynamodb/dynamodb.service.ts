import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  QueryCommandOutput,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDBService {
  private readonly _dynamoDB: DynamoDBClient;
  public _table: string;

  constructor() {
    const REGION = process.env.AWS_REGION;

    this._dynamoDB = new DynamoDBClient({
      region: REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
    this._table = process.env.CUSTOMER_TABLE_NAME;
  }

  create = async (entity: any) => {
    const params = {
      TableName: this._table,
      Item: entity,
      ConditionExpression: 'PK <> :PK AND SK <> :SK',
      ExpressionAttributeValues: { ':PK': entity.PK, ':SK': entity.SK },
    };

    await this._dynamoDB.send(new PutCommand(params));
  };

  delete = async (entity: any) => {
    await this._dynamoDB.send(new DeleteCommand(entity));
  };

  /**
   * Description.
   * Update object in Dynamo DB
   *
   * @param {object} key   Plain object with PK and SK to update
   * @param {object} updateExpression DynamoDB update expression
   * @param {object} attributeNames DynamoDB expression attributes names
   * @param {object} attributeValues DynamoDB expression attributes values
   *
   */
  update = async (
    key: any,
    updateExpression: any,
    attributeNames: any,
    attributeValues: any,
  ) => {
    const params = {
      TableName: this._table,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attributeValues,
      ReturnValues: 'UPDATED_NEW',
    };

    return this._dynamoDB.send(new UpdateCommand(params));
  };

  getItems = async (queryParams: any): Promise<QueryCommandOutput | any> => {
    const scanOrQuery = queryParams.KeyConditionExpression ? 'query' : 'scan';

    queryParams = { TableName: this._table, ...queryParams };

    if (scanOrQuery === 'query') {
      const command = new QueryCommand(queryParams);
      return this._dynamoDB.send(command);
    } else {
      const command = new ScanCommand(queryParams);
      return this._dynamoDB.send(command);
    }
  };
}
