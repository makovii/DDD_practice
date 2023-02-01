import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerEntity } from 'src/domain/entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerEntity: CustomerEntity) {}

  @Post('/registration')
  registrationCustomer(@Body() input: CustomerDto) {
    return this.customerEntity.registrationCustomer(input.email, input.name, input.password);
  }

  @Get('/login')
  loginCustomer(@Body() input: Partial<CustomerDto>) {
    return this.customerEntity.loginCustomer(input.email, input.password);
  }
}
