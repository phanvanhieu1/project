import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Matches,
  } from 'class-validator'
  import phone from 'phone'
  
  @ValidatorConstraint({ name: 'PhoneValidation', async: false })
  export default class PhoneValidation implements ValidatorConstraintInterface {
    validate(phoneNumber: string, args: ValidationArguments) {
      let country = 'VN'
      let zipCode = '+84'
      try {
        const obj = JSON.parse(JSON.stringify(args.object))
        if (obj.country) country = obj.country
        if (obj.zipCode) zipCode = obj.zipCode
        if (country.length > 10) return false
        if (zipCode.length > 10) return false
        if (phoneNumber.length > 30) return false
  
        const resultPhoneValidate = phone(`${phoneNumber}`, { country })
        if (!resultPhoneValidate) return false
        return resultPhoneValidate.isValid
      } catch (e) {
        console.log('Error PhoneValidation', e)
        return false
      }
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Phone number format is not valid'
    }
  }
  