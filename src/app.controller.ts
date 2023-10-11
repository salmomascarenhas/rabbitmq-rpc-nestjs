import { Controller, Get } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly amrpConnection: AmqpConnection) {}

  @Get()
  sendMessage(): void {
    // (exchange: string, routingKey: string, message: string, options?: Options.Publish)
    this.amrpConnection.publish<string>(
      'devolutiva_exchange',
      'devolutiva.process',
      JSON.stringify({ message: 'Message from NestJS' }),
    );
    console.log('Message sent');
  }

  @RabbitSubscribe({
    exchange: 'devolutiva_exchange',
    routingKey: 'devolutiva.response',
    queue: 'response_queue',
  })
  public async rpcHandler(message: any) {
    console.log('Message received');
    console.log(message);
  }
}
