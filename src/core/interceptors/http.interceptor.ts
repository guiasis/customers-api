import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class HttpInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const contextHttp = context.switchToHttp();

    if (contextHttp) {
      const req = contextHttp.getRequest();

      if ((req?.url && req.url.search('health')) > -1) {
        return next.handle();
      }
    }

    return next.handle().pipe(map((data) => data));
  }
}
