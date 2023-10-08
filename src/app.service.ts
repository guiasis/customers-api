import { Injectable } from '@nestjs/common';

import { version } from '../package.json';

@Injectable()
export class AppService {
  healthCheck(): any {
    return {
      status: 'Customers Services Api OK.',
      version,
    };
  }
}
