import { Body, Controller, Get, HttpException, Post, UnauthorizedException } from '@nestjs/common';
import { CustomerEntity } from 'src/domain/entity/customer.entity';
import { CustomerMapper } from 'src/mappers/customer.mapper';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerEntity: CustomerEntity) {}

  @Post('/registration')
  async registrationCustomer(@Body() input: CustomerDto): Promise<CustomerDto | HttpException> {
    const entity = await this.customerEntity.registrationCustomer(input.email, input.name, input.password);
    
    if(entity.name === "HttpException") return entity;
    const dto: CustomerDto = CustomerMapper.EntityToDto(entity as CustomerEntity);
    return dto;
  }

  @Get('/login')
  loginCustomer(@Body() input: Partial<CustomerDto>): Promise<string | UnauthorizedException> {
    return this.customerEntity.loginCustomer(input.email, input.password);
  }
}
