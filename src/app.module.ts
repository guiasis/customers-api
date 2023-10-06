import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './core/aws/aws.module';
import { AllExceptionsFilter } from './core/exceptions/all-exceptions.filter';
import { HttpInterceptor } from './core/interceptors';
import { CustomersModule } from './features/customers/customers.module';

@Module({
  imports: [CustomersModule, AwsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class AppModule {}
