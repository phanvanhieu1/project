import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common'
import { ObjectId } from 'mongodb'

@Injectable()
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
    public transform(value: string, metadata: ArgumentMetadata): ObjectId {
        try {
            return ObjectId.createFromHexString(value)
        } catch (error) {
            throw new BadRequestException('Validation failed (ObjectId is expected)')
        }
    }
}
