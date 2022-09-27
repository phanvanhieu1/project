import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Matches,
  } from 'class-validator'
  
  @ValidatorConstraint({ name: 'UsernameValidation', async: false })
  export default class UsernameValidation implements ValidatorConstraintInterface {
    validate(username: string) {
      if (username === 'root') return true
      const regexp = new RegExp(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, 'igm')
      return regexp.test(username)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Username format is not valid'
    }
  }
  