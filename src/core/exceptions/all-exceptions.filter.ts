import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { sendSNS } from '../aws/aws.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string = exception?.response?.message || exception.message;

    const stack: string = exception?.stack;

    try {
      if (process.env.NODE_ENV === 'prd') {
        await sendSNS({
          args: `${process.env.NODE_ENV} - Message:${message} - Stack:${stack} - Error:${exception}`,
        });
      }
    } catch (error) {
      console.error(error);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      stack,
    });
  }
}
