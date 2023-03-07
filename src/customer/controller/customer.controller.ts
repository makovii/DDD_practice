import { Body, Controller, Get, HttpException, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerMapper } from '../customer.mapper';
import { CustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserFromJwt } from 'src/userFromJwt';
import { CustomerService } from '../service/customer.service';
import { Art } from 'src/painter/repository/art.model';

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

  @Post('/purche')
  @UseGuards(JwtAuthGuard)
  async purche(@Req() userJwt: any, @Body() art: Art) {
    const user = await this.customerEntity.purche(userJwt.user, art);

    if ((user as {message: string}).message ) return user
    const userDto = CustomerMapper.EntityToDto(user as CustomerEntity, userJwt.user);
    return userDto;
  }
}
