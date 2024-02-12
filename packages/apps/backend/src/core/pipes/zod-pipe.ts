import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    this.schema.parse(value)
    return value
  }
}
