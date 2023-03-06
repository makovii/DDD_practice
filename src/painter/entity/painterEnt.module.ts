import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as env from 'env-var';
import { PainterEntity } from './painter.entity';
import { PainterRepModule } from '../repository/painterRep.module';

@Module({
  imports: [
    PainterRepModule,
		JwtModule.register({
      secret: env.get('PRIVATE_KEY').default('SOME_MSG').required().asString(),
      signOptions: {
        expiresIn: '24h',
      },
    }),],
	providers: [PainterEntity, JwtStrategy],
	exports: [PainterEntity, JwtModule],
})
export class PainterEntModule {}