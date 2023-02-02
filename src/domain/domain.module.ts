import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CustomerModule } from 'src/repository/customer/customer.module';
import { CustomerEntity } from './entity/customer.entity';
import { JwtModule } from '@nestjs/jwt';
import * as env from 'env-var';
import { PainterEntity } from './entity/painter.entity';
import { PainterModule } from 'src/repository/painter/painter.module';

@Module({
  imports: [
		CustomerModule,
    PainterModule,
		JwtModule.register({
      secret: env.get('PRIVATE_KEY').default('SOME_MSG').required().asString(),
      signOptions: {
        expiresIn: '24h',
      },
    }),],
	providers: [CustomerEntity, PainterEntity, JwtStrategy],
	exports: [CustomerEntity, PainterEntity, JwtModule],
})
export class DomainModule {}