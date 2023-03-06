import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CustomerRepModule } from '../repository/customer.module';
import { CustomerEntity } from './customer.entity';
import { JwtModule } from '@nestjs/jwt';
import * as env from 'env-var';

@Module({
  imports: [
		CustomerRepModule,
		JwtModule.register({
      secret: env.get('PRIVATE_KEY').default('SOME_MSG').required().asString(),
      signOptions: {
        expiresIn: '24h',
      },
    }),],
	providers: [CustomerEntity, JwtStrategy],
	exports: [CustomerEntity, JwtModule],
})
export class CustomerEntModule {}