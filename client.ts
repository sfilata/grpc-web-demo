// const { EchoServiceClient, EchoRequest } = require('./dependency');
import { EchoServiceClient, EchoRequest } from './dependency';

const echoService = new EchoServiceClient('http://localhost:8080');

const request = new EchoRequest();
request.setMessage('Hello, Sfilata');

echoService.echo(request, {}, (err: unknown, res: { getMessage: () => string; getName: () => string }) => {
  const [message, name] = [res.getMessage() as string, res.getName() as string];
  if (err) {
    console.log('Error occured!');
  }

  console.log(message, name);
  (document.getElementById('content') as HTMLElement).innerHTML = `${message}. ${name}`;
});
