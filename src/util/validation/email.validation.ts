import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator'
  
  @ValidatorConstraint({ name: 'EmailValidation', async: false })
  export default class EmailValidation implements ValidatorConstraintInterface {
    validate(email?: string) {
      if (!email) return false
  
      if (email.length > 254) return false
  
      const regexp = new RegExp(
        /^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
        'igm',
      )
      const valid = regexp.test(email)
      if (!valid) return false
  
      // Further checking of some things regex can't handle
      const parts = email.split('@')
      if (parts[0].length > 64) return false
  
      const domainParts = parts[1].split('.')
      if (
        domainParts.some((part) => {
          return part.length > 63
        })
      )
        return false
  
      return true
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Email format is not valid'
    }
  }
  