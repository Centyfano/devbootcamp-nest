import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongooseFilter<T> implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.name) {
      case 'CaseError':
        return 'Resource not found';
      case 'ValidationError':
        const message = Object.values(exception.errmsg).map((val) => val);
        return message;
    }
  }
}
