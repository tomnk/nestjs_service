import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth';
import { AppController } from './controllers';
import { LoggerModule } from 'src/common/logger';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_A',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    AuthModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
