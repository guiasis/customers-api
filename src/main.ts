import {
  INestApplication,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import * as helmet from 'helmet';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
  Handler,
} from 'aws-lambda';
import { AppModule } from './app.module';
import { HttpInterceptor } from './core/interceptors';

let server: Handler;

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Customers API')
    .setDescription('Auth and Customers Services')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
}

const bootstrap = async (): Promise<Handler> => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpInterceptor());
  app.use(helmet.default());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  setupSwagger(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.path === '/api') {
    event.path = '/api/';
  }

  if (event.path?.includes('swagger-ui')) {
    event.path = !event.path.includes('/api/')
      ? `/api/${event.path}`
      : event.path;

    if (event.pathParameters?.proxy) {
      event.pathParameters.proxy = 'api/' + event.pathParameters.proxy;
    }
  }

  console.log(event.path);
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
