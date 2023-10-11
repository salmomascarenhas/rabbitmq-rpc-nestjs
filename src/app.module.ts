import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      // name: 'rabbitmq',
      exchanges: [
        {
          name: 'devolutiva_exchange',
          type: 'direct',
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672',
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
