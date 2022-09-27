import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export default class DecodeURIComponent implements PipeTransform<any, string> {
    public transform(value: string, metadata: ArgumentMetadata): string {
        return decodeURIComponent(value)
    }
}
