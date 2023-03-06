import { Body, Controller, Get, HttpException, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerMapper } from '../customer.mapper';
import { CustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserFromJwt } from 'src/userFromJwt';

@Controller('customer')
export class CustomerController {
  constructor(private customerEntity: CustomerEntity) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() userJwt: any) {
    const user = await this.customerEntity.getMe(userJwt.user.id);

    const userDto = CustomerMapper.EntityToDto(user, userJwt.user);
    return userDto;
  }
}
